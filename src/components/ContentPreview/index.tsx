/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useMemo, useState } from 'react';
import styled from 'styled-components';

const docModules = import.meta.glob('../../../content-docs/**/*.md', {
    eager: true,
    import: 'default',
    query: '?raw',
}) as Record<string, string>;

type DocItem = {
    path: string;
    title: string;
    moduleName: string;
    content: string;
};

type Block =
    | { type: 'heading'; level: number; text: string }
    | { type: 'paragraph'; lines: string[] }
    | { type: 'list'; items: string[] }
    | { type: 'numbered'; items: string[] };

const themeColor = '#3b82f6';

const normalizePath = (path: string) => path.replace('../../../content-docs/', 'content-docs/');

const getModuleName = (path: string) => {
    const parts = normalizePath(path).split('/');
    return parts.length > 2 ? parts[1].replace(/^\d+-/, '').replace(/-/g, ' ') : 'root';
};

const getTitle = (content: string, path: string) => {
    const titleLine = content.split('\n').find(line => line.startsWith('# '));
    return titleLine ? titleLine.replace(/^#\s+/, '').trim() : normalizePath(path).split('/').pop() || path;
};

const docs: DocItem[] = Object.entries(docModules)
    .map(([path, content]) => ({
        path: normalizePath(path),
        title: getTitle(content, path),
        moduleName: getModuleName(path),
        content,
    }))
    .sort((a, b) => a.path.localeCompare(b.path));

const parseMarkdown = (content: string): Block[] => {
    const blocks: Block[] = [];
    const lines = content.replace(/\r\n/g, '\n').split('\n');
    let index = 0;

    const pushParagraph = (paragraphLines: string[]) => {
        if (paragraphLines.length > 0) {
            blocks.push({ type: 'paragraph', lines: paragraphLines });
        }
    };

    while (index < lines.length) {
        const line = lines[index].trim();

        if (!line) {
            index += 1;
            continue;
        }

        const headingMatch = line.match(/^(#{1,4})\s+(.*)$/);
        if (headingMatch) {
            blocks.push({ type: 'heading', level: headingMatch[1].length, text: headingMatch[2] });
            index += 1;
            continue;
        }

        if (line.startsWith('- ')) {
            const items: string[] = [];
            while (index < lines.length && lines[index].trim().startsWith('- ')) {
                items.push(lines[index].trim().replace(/^-\s+/, ''));
                index += 1;
            }
            blocks.push({ type: 'list', items });
            continue;
        }

        if (/^\d+\.\s+/.test(line)) {
            const items: string[] = [];
            while (index < lines.length && /^\d+\.\s+/.test(lines[index].trim())) {
                items.push(lines[index].trim().replace(/^\d+\.\s+/, ''));
                index += 1;
            }
            blocks.push({ type: 'numbered', items });
            continue;
        }

        const paragraphLines: string[] = [];
        while (
            index < lines.length &&
            lines[index].trim() &&
            !/^#{1,4}\s+/.test(lines[index].trim()) &&
            !lines[index].trim().startsWith('- ') &&
            !/^\d+\.\s+/.test(lines[index].trim())
        ) {
            paragraphLines.push(lines[index].trim());
            index += 1;
        }
        pushParagraph(paragraphLines);
    }

    return blocks;
};

const formatInline = (text: string) => {
    const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g).filter(Boolean);
    return parts.map((part, index) => {
        if (part.startsWith('`') && part.endsWith('`')) {
            return <InlineCode key={index}>{part.slice(1, -1)}</InlineCode>;
        }
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={index}>{part.slice(2, -2)}</strong>;
        }
        return <React.Fragment key={index}>{part}</React.Fragment>;
    });
};

const getBlockTone = (heading: string) => {
    if (/练习|Practice|Check|判断|选择|找出/.test(heading)) return 'practice';
    if (/答案|Answer/.test(heading)) return 'answer';
    if (/提醒|记住|公式|结构|卡片|放哪里|小结/.test(heading)) return 'card';
    return 'normal';
};

const ContentPreview = () => {
    const [selectedPath, setSelectedPath] = useState(docs[0]?.path || '');
    const [query, setQuery] = useState('');
    const selectedDoc = docs.find(doc => doc.path === selectedPath) || docs[0];

    const filteredDocs = useMemo(() => {
        const value = query.trim().toLowerCase();
        if (!value) return docs;
        return docs.filter(doc =>
            doc.path.toLowerCase().includes(value) ||
            doc.title.toLowerCase().includes(value) ||
            doc.moduleName.toLowerCase().includes(value)
        );
    }, [query]);

    const blocks = useMemo(() => parseMarkdown(selectedDoc?.content || ''), [selectedDoc]);

    let currentTone: ReturnType<typeof getBlockTone> = 'normal';

    return (
        <PreviewShell>
            <Sidebar>
                <SidebarHeader>
                    <Eyebrow>Content Lab</Eyebrow>
                    <h1>内容预览</h1>
                    <p>改 `content-docs` 后，这里会用网页样式刷新预览。</p>
                </SidebarHeader>
                <SearchInput
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="搜索 lesson / 文件名"
                />
                <DocList>
                    {filteredDocs.map(doc => (
                        <DocButton
                            key={doc.path}
                            type="button"
                            $active={doc.path === selectedDoc.path}
                            onClick={() => setSelectedPath(doc.path)}
                        >
                            <span>{doc.title}</span>
                            <small>{doc.path.replace('content-docs/', '')}</small>
                        </DocButton>
                    ))}
                </DocList>
            </Sidebar>

            <MainPanel>
                <TopBar>
                    <div>
                        <PathLabel>{selectedDoc?.path}</PathLabel>
                        <Title>{selectedDoc?.title}</Title>
                    </div>
                    <Badge>{selectedDoc?.moduleName}</Badge>
                </TopBar>

                <LessonCanvas>
                    {blocks.map((block, index) => {
                        if (block.type === 'heading') {
                            currentTone = getBlockTone(block.text);
                            if (block.level === 1) {
                                return <LessonTitle key={index}>{formatInline(block.text)}</LessonTitle>;
                            }
                            return <SectionHeading key={index} $tone={currentTone}>{formatInline(block.text)}</SectionHeading>;
                        }

                        if (block.type === 'paragraph') {
                            return (
                                <TextCard key={index} $tone={currentTone}>
                                    {block.lines.map((line, lineIndex) => (
                                        <p key={lineIndex}>{formatInline(line)}</p>
                                    ))}
                                </TextCard>
                            );
                        }

                        if (block.type === 'list') {
                            return (
                                <PillGrid key={index}>
                                    {block.items.map((item, itemIndex) => (
                                        <Pill key={itemIndex}>{formatInline(item)}</Pill>
                                    ))}
                                </PillGrid>
                            );
                        }

                        return (
                            <PracticeList key={index} $tone={currentTone}>
                                {block.items.map((item, itemIndex) => (
                                    <PracticeItem key={itemIndex}>
                                        <IndexDot>{itemIndex + 1}</IndexDot>
                                        <span>{formatInline(item)}</span>
                                    </PracticeItem>
                                ))}
                            </PracticeList>
                        );
                    })}
                </LessonCanvas>
            </MainPanel>
        </PreviewShell>
    );
};

const PreviewShell = styled.div`
    min-height: 100vh;
    display: grid;
    grid-template-columns: minmax(280px, 340px) 1fr;
    background: #eef2f7;
    color: #1f2937;

    @media (max-width: 860px) {
        grid-template-columns: 1fr;
    }
`;

const Sidebar = styled.aside`
    background: #ffffff;
    border-right: 1px solid #dbe3ee;
    padding: 22px;
    height: 100vh;
    position: sticky;
    top: 0;
    overflow-y: auto;

    @media (max-width: 860px) {
        height: auto;
        position: static;
    }
`;

const SidebarHeader = styled.div`
    margin-bottom: 18px;

    h1 {
        font-size: 1.5rem;
        margin: 4px 0 8px;
        color: #111827;
    }

    p {
        color: #64748b;
        line-height: 1.5;
        font-size: 0.92rem;
    }
`;

const Eyebrow = styled.div`
    color: ${themeColor};
    font-size: 0.78rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
`;

const SearchInput = styled.input`
    width: 100%;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    padding: 10px 12px;
    font-size: 0.95rem;
    margin-bottom: 14px;
    outline: none;

    &:focus {
        border-color: ${themeColor};
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.16);
    }
`;

const DocList = styled.div`
    display: grid;
    gap: 8px;
`;

const DocButton = styled.button<{ $active: boolean }>`
    border: 1px solid ${props => props.$active ? themeColor : '#e2e8f0'};
    background: ${props => props.$active ? '#eff6ff' : '#ffffff'};
    border-radius: 8px;
    padding: 10px;
    text-align: left;
    cursor: pointer;

    span {
        display: block;
        color: #1f2937;
        font-weight: 700;
        line-height: 1.35;
    }

    small {
        display: block;
        color: #64748b;
        margin-top: 4px;
        line-height: 1.35;
        word-break: break-word;
    }
`;

const MainPanel = styled.main`
    padding: 28px;

    @media (max-width: 860px) {
        padding: 16px;
    }
`;

const TopBar = styled.div`
    max-width: 960px;
    margin: 0 auto 18px;
    display: flex;
    justify-content: space-between;
    gap: 16px;
    align-items: flex-start;
`;

const PathLabel = styled.div`
    color: #64748b;
    font-size: 0.9rem;
    margin-bottom: 6px;
`;

const Title = styled.h2`
    color: #111827;
    font-size: 1.8rem;
`;

const Badge = styled.div`
    background: #dbeafe;
    color: #1d4ed8;
    border-radius: 999px;
    padding: 6px 10px;
    font-weight: 700;
    white-space: nowrap;
`;

const LessonCanvas = styled.article`
    max-width: 960px;
    margin: 0 auto;
    background: #ffffff;
    border: 1px solid #dbe3ee;
    border-radius: 10px;
    padding: 28px;

    @media (max-width: 640px) {
        padding: 18px;
    }
`;

const LessonTitle = styled.h1`
    color: #111827;
    font-size: 2rem;
    margin-bottom: 22px;
`;

const SectionHeading = styled.h2<{ $tone: string }>`
    color: #1f2937;
    font-size: 1.25rem;
    margin: 28px 0 12px;
    padding-top: 18px;
    border-top: 2px solid ${props => props.$tone === 'practice' ? '#bfdbfe' : props.$tone === 'answer' ? '#bbf7d0' : '#e2e8f0'};
`;

const TextCard = styled.div<{ $tone: string }>`
    background: ${props => props.$tone === 'practice' ? '#eff6ff' : props.$tone === 'answer' ? '#f0fdf4' : props.$tone === 'card' ? '#f8fafc' : '#ffffff'};
    border: 1px solid ${props => props.$tone === 'practice' ? '#bfdbfe' : props.$tone === 'answer' ? '#bbf7d0' : '#e2e8f0'};
    border-left: 4px solid ${props => props.$tone === 'practice' ? themeColor : props.$tone === 'answer' ? '#16a34a' : '#94a3b8'};
    border-radius: 8px;
    padding: 14px 16px;
    margin-bottom: 12px;

    p {
        line-height: 1.7;
        color: #374151;
    }

    p + p {
        margin-top: 8px;
    }
`;

const PillGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin: 0 0 14px;
`;

const Pill = styled.span`
    background: #ffffff;
    border: 1px solid #bfdbfe;
    color: #1d4ed8;
    border-radius: 999px;
    padding: 7px 11px;
    font-weight: 700;
`;

const PracticeList = styled.div<{ $tone: string }>`
    display: grid;
    gap: 10px;
    margin-bottom: 16px;
    background: ${props => props.$tone === 'answer' ? '#f0fdf4' : '#f8fafc'};
    border: 1px solid ${props => props.$tone === 'answer' ? '#bbf7d0' : '#e2e8f0'};
    border-radius: 8px;
    padding: 12px;
`;

const PracticeItem = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 10px;
    line-height: 1.55;
    color: #334155;
`;

const IndexDot = styled.span`
    width: 24px;
    height: 24px;
    border-radius: 999px;
    background: ${themeColor};
    color: #ffffff;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 0.78rem;
    font-weight: 800;
    flex: 0 0 auto;
`;

const InlineCode = styled.code`
    background: #e0f2fe;
    color: #075985;
    border-radius: 5px;
    padding: 2px 6px;
    font-weight: 700;
`;

export default ContentPreview;
