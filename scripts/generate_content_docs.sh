#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DOCS_DIR="$ROOT_DIR/content-docs"

rm -rf "$DOCS_DIR"
mkdir -p "$DOCS_DIR"

cat > "$DOCS_DIR/README.md" <<'EOF'
# English Grammar Content Docs

This directory is the planning layer for English Grammar Page content.

## Workflow

1. Decide teaching content here first.
2. Edit or approve the Markdown docs.
3. Ask Codex to sync the approved docs back into the React lesson files.

## Why this exists

- The current TSX files mix content, UI, and interaction.
- It is hard to judge whether a lesson is good when the wording lives inside components.
- These docs separate `content decision` from `page implementation`.

## Recommended editing rule

- Keep explanations short.
- Prefer clear learning targets.
- Write examples only when they support practice.
- Define micro-practice and final practice in the doc before changing code.

## Structure

- `00-curriculum-map.md`: overall module map
- `00-practice-components.md`: current reusable exercise components
- `NN-module-slug/`: one folder per module
- `NN-module-slug/00-module-overview.md`: module overview
- `NN-module-slug/NN-unit-slug.md`: one file per unit
EOF

cat > "$DOCS_DIR/00-practice-components.md" <<'EOF'
# Practice Components

These are the current reusable practice components found in the codebase.

## Core components

- `src/components/practice/WordSelectorPractice.tsx`
  - Click the target word(s) inside a sentence
- `src/components/practice/MultipleChoicePractice.tsx`
  - Multiple choice with quick feedback
- `src/components/practice/SentenceBuilderPractice.tsx`
  - Rearrange chunks into a sentence
- `src/components/practice/FillInTheBlankPractice.tsx`
  - Fill in blanks
- `src/components/practice/VerbFillPractice.tsx`
  - Verb form completion
- `src/components/practice/FindMainClausePractice.tsx`
  - Main clause identification
- `src/components/practice/StoryPractice.tsx`
  - Story-based interaction
- `src/components/practice/ComponentDragDropPractice.tsx`
  - Drag-and-drop style practice

## Suggested workflow

When revising a unit doc:

1. Define the teaching goal.
2. Define the minimum explanation.
3. Choose the smallest useful practice type.
4. Reuse an existing component before inventing a new one.
EOF

modules=(
  "01|parts-of-speech|词性学习|Parts of Speech"
  "02|sentence-components|句子成分|Sentence Components"
  "03|pos-vs-components|词性 vs 句子成分|How They Connect"
  "04|basic-sentence-structures|基础句型结构|Basic Sentence Structures"
  "05|questions|疑问句学习|Questions"
  "06|clauses|从句|Clauses"
  "07|common-sentence-structures|常见句子结构|Common Sentence Structures"
  "08|tenses|基础时态学习|Basic Tenses"
  "09|vocabulary|词汇练习|Vocabulary Practice"
  "10|pronunciation|发音练习|Pronunciation Practice"
)

get_units() {
  case "$1" in
    "parts-of-speech")
      cat <<'EOF'
词性基础|01|nouns|名词|Nouns|src/components/content/PartsOfSpeech/NounsContent.tsx
词性基础|02|verbs|动词|Verbs|src/components/content/PartsOfSpeech/VerbsContent.tsx
词性基础|03|adjectives|形容词|Adjectives|src/components/content/PartsOfSpeech/AdjectivesContent.tsx
词性基础|04|adverbs|副词|Adverbs|src/components/content/PartsOfSpeech/AdverbsContent.tsx
词性基础|05|prepositions|介词|Prepositions|src/components/content/PartsOfSpeech/PrepositionsContent.tsx
词性基础|06|conjunctions|连词|Conjunctions|src/components/content/PartsOfSpeech/ConjunctionsContent.tsx
词性基础|07|pronouns|代词|Pronouns|src/components/content/PartsOfSpeech/PronounsContent.tsx
词性基础|08|articles|冠词|Articles|src/components/content/PartsOfSpeech/ArticlesContent.tsx
词性练习|09|fast|Fast|Fast|src/components/content/MultiPos/FastContent.tsx
词性练习|10|happy-happily|Happy / Happily|Adjective vs Adverb|src/components/content/MultiPos/HappyContent.tsx
词性练习|11|good-well|Good / Well|Adjective vs Adverb|src/components/content/MultiPos/GoodWellContent.tsx
词性练习|12|work|Work|Noun vs Verb|src/components/content/MultiPos/WorkContent.tsx
词性练习|13|slow-slowly|Slow / Slowly|Adjective vs Adverb|src/components/content/MultiPos/SlowContent.tsx
词性练习|14|access-accessible|Access / Accessible|Word Form Contrast|src/components/content/MultiPos/AccessContent.tsx
词性练习|15|value|Value|Noun vs Verb|src/components/content/MultiPos/ValueContent.tsx
词性练习|16|available|Available|Adjective Focus|src/components/content/MultiPos/AvailableContent.tsx
EOF
      ;;
    "sentence-components")
      cat <<'EOF'
核心成分|01|subject|主语|Subject|src/components/content/SentenceComponents/SubjectContent.tsx
核心成分|02|predicate|谓语|Predicate|src/components/content/SentenceComponents/PredicateContent.tsx
核心成分|03|object|宾语|Object|src/components/content/SentenceComponents/ObjectContent.tsx
修饰成分|04|attributive|定语|Attributive|src/components/content/SentenceComponents/AttributiveContent.tsx
修饰成分|05|adverbial|状语|Adverbial|src/components/content/SentenceComponents/AdverbialContent.tsx
补充成分|06|complement|补语|Complement|src/components/content/SentenceComponents/ComplementContent.tsx
EOF
      ;;
    "pos-vs-components")
      cat <<'EOF'
桥梁单元|01|pos-vs-components|词性 vs 句子成分|How They Connect|src/components/content/Bridge/PosComponentsBridgeContent.tsx
EOF
      ;;
    "basic-sentence-structures")
      cat <<'EOF'
基础句型|01|svo|主谓宾|Subject + Verb + Object|src/components/content/Structures/SVOContent.tsx
基础句型|02|svc|主系表|Subject + Verb + Complement|src/components/content/Structures/SVCContent.tsx
基础句型|03|svoc|主谓宾宾补|Subject + Verb + Object + Complement|src/components/content/Structures/SVOCContent.tsx; src/components/content/Structures/SVOCNounContent.tsx; src/components/content/Structures/SVOCAdjectiveContent.tsx
扩展练习|04|sentence-expansion|简单句扩展练习|Simple Sentence Expansion|src/components/content/Structures/SentenceExpansionContent.tsx
EOF
      ;;
    "questions")
      cat <<'EOF'
疑问句类型|01|modal-verbs|情态动词|Modal Verbs|src/components/content/Questions/ModalVerbsContent.tsx
疑问句类型|02|yes-no-questions|一般疑问句|Yes/No Questions|src/components/content/Questions/YesNoQuestionsContent.tsx
疑问句类型|03|wh-questions|特殊疑问句|Wh- Questions|src/components/content/Questions/WhQuestionsContent.tsx
疑问句类型|04|other-questions|其他常见疑问句|Other Common Questions|src/components/content/Questions/OtherQuestionsContent.tsx
EOF
      ;;
    "clauses")
      cat <<'EOF'
从句基础|01|what-is-a-clause|什么是从句？|What is a Clause?|src/components/content/Clauses/WhatIsAClauseContent.tsx
从句类型|02|object-clauses|宾语从句|Object Clauses|src/components/content/Clauses/ObjectClausesContent.tsx
从句类型|03|attributive-clauses|定语从句|Attributive Clauses|src/components/content/Clauses/AttributiveClausesContent.tsx
从句类型|04|adverbial-clauses|状语从句|Adverbial Clauses|src/components/content/Clauses/AdverbialClausesContent.tsx
从句类型|05|subject-clauses|主语从句|Subject Clauses|src/components/content/Clauses/SubjectClausesContent.tsx
练习|06|find-main-clause|找主句练习|Find the Main Clause Practice|src/components/content/Structures/FindMainClauseContent.tsx
EOF
      ;;
    "common-sentence-structures")
      cat <<'EOF'
常见结构|01|gerunds|动词-ing的用法|Usage of V-ing|src/components/content/CommonStructures/GerundsContent.tsx
常见结构|02|infinitives|不定式的用法|Usage of Infinitives|src/components/content/CommonStructures/InfinitivesContent.tsx
常见结构|03|it-is-adj-for-sb|It is adj./noun for sb. to do sth.|Formal Subject It|src/components/content/CommonStructures/ItIsAdjForSbContent.tsx
常见结构|04|there-be|There be 句型|There is / There are|src/components/content/CommonStructures/ThereBeContent.tsx
常见结构|05|ed-ing-adjectives|形容词 -ed vs -ing|Adjectives: -ed vs -ing|src/components/content/CommonStructures/EdIngAdjectivesContent.tsx
介词结构|06|of-usage|介词 of 的用法|Usage of of|src/components/content/CommonStructures/OfUsageContent.tsx
介词结构|07|with-usage|介词 with 的用法|Usage of with|src/components/content/CommonStructures/WithUsageContent.tsx
介词结构|08|by-usage|介词 by 的用法|Usage of by|src/components/content/CommonStructures/ByUsageContent.tsx
动词结构|09|make-usage|make 的用法|Usage of make|src/components/content/CommonStructures/MakeUsageContent.tsx
动词结构|10|keep-usage|keep 的用法|Usage of keep|src/components/content/CommonStructures/KeepUsageContent.tsx
功能词结构|11|as-usage|as 的用法|Usage of as|src/components/content/CommonStructures/AsUsageContent.tsx
功能词结构|12|as-as-usage|同级比较 as...as|Comparisons with as...as|src/components/content/CommonStructures/AsAsUsageContent.tsx
比较与感叹|13|comparatives-superlatives|比较级和最高级|Comparatives & Superlatives|src/components/content/CommonStructures/ComparativesSuperlativesContent.tsx
比较与感叹|14|what-how-exclamations|What 和 How 的感叹句|What / How Exclamations|src/components/content/CommonStructures/WhatHowExclamationsContent.tsx
连接结构|15|so-that|so that / so...that... 的用法|Purpose and Result|src/components/content/CommonStructures/SoThatContent.tsx
固定搭配|16|one-of|one of 的用法|Usage of one of|src/components/content/CommonStructures/OneOfUsageContent.tsx
EOF
      ;;
    "tenses")
      cat <<'EOF'
基础时态|01|past-tense|一般过去时|Simple Past Tense|src/components/content/Tenses/PastTenseContent.tsx
基础时态|02|present-continuous|现在进行时|Present Continuous|src/components/content/Tenses/PresentContinuousContent.tsx
基础时态|03|past-continuous|过去进行时|Past Continuous|src/components/content/Tenses/PastContinuousContent.tsx
基础时态|04|future-tense|将来时|Future Tense|src/components/content/Tenses/FutureTenseContent.tsx
基础时态|05|present-perfect|现在完成时|Present Perfect|src/components/content/Tenses/PresentPerfectContent.tsx
EOF
      ;;
    "vocabulary")
      cat <<'EOF'
词汇辨析|01|affect-effect|Affect vs. Effect|Commonly Confused Words|src/components/content/Vocabulary/AffectEffectContent.tsx
词汇辨析|02|available-accessible|Available vs. Accessible|Commonly Confused Adjectives|src/components/content/Vocabulary/AvailableAccessibleContent.tsx
固定表达|03|balance-and|balance ... and ... 的用法|balance ... and ...|src/components/content/Vocabulary/BalanceAndContent.tsx
固定表达|04|help-usage|help 的用法|Usage of help|src/components/content/Vocabulary/HelpUsageContent.tsx
固定表达|05|pity-usage|pity 的用法|Usage of pity|src/components/content/Vocabulary/PityUsageContent.tsx
词汇辨析|06|incorporate-cooperate-corporate|Incorporate / Cooperate / Corporate|Commonly Confused Words|src/components/content/Vocabulary/IncorporateCooperateCorporateContent.tsx
固定表达|07|sense-of|a sense of 的用法|a sense of|src/components/content/Vocabulary/SenseOfUsageContent.tsx
固定表达|08|impression|impression 的用法|Usage of impression|src/components/content/Vocabulary/ImpressionUsageContent.tsx
固定表达|09|do-more-harm-than-good|do more harm than good|Phrase Usage|src/components/content/Vocabulary/DoMoreHarmGoodContent.tsx
固定表达|10|guarantee|guarantee 的用法|Usage of guarantee|src/components/content/Vocabulary/GuaranteeUsageContent.tsx
词汇辨析|11|admit-admission|Admit vs. Admission|Commonly Confused Words|src/components/content/Vocabulary/AdmitAdmissionUsageContent.tsx
词根词缀|12|micro-macro|micro- vs macro-|Prefixes|src/components/content/Vocabulary/MicroMacroContent.tsx
固定表达|13|rather-than-instead-of|Rather than vs. Instead of|Expressing Alternatives|src/components/content/Vocabulary/RatherThanInsteadOfContent.tsx
固定表达|14|apply-usage|apply 的用法|Usage of apply|src/components/content/Vocabulary/ApplyUsageContent.tsx
EOF
      ;;
    "pronunciation")
      cat <<'EOF'
发音规则|01|ed-endings|-ed 结尾的发音|Pronunciation of -ed Endings|src/components/content/Pronunciation/EdPronunciationContent.tsx
EOF
      ;;
    *)
      return 1
      ;;
  esac
}

curriculum_map="$DOCS_DIR/00-curriculum-map.md"
cat > "$curriculum_map" <<'EOF'
# Curriculum Map

This file mirrors the current teaching structure in the codebase.

Use it to decide:

- module order
- unit order
- what should stay
- what should be removed or merged

EOF

for module in "${modules[@]}"; do
  IFS='|' read -r module_order module_slug module_title_cn module_title_en <<< "$module"
  module_dir="$DOCS_DIR/${module_order}-${module_slug}"
  mkdir -p "$module_dir"

  units="$(get_units "$module_slug")"
  unit_count="$(printf '%s\n' "$units" | sed '/^$/d' | wc -l | tr -d ' ')"

  case "$module_slug" in
    "parts-of-speech") module_entry_file='src/components/content/PartsOfSpeech/PartsOfSpeechContent.tsx' ;;
    "sentence-components") module_entry_file='src/components/content/SentenceComponents/SentenceComponentsContent.tsx' ;;
    "pos-vs-components") module_entry_file='src/components/content/Bridge/PosComponentsBridgeContent.tsx' ;;
    "basic-sentence-structures") module_entry_file='src/components/content/Structures/StructuresContent.tsx' ;;
    "questions") module_entry_file='src/components/content/Questions/QuestionsContent.tsx' ;;
    "clauses") module_entry_file='src/components/content/Clauses/ClausesContent.tsx' ;;
    "common-sentence-structures") module_entry_file='src/components/content/CommonStructures/CommonStructuresContent.tsx' ;;
    "tenses") module_entry_file='src/components/content/Tenses/TensesContent.tsx' ;;
    "vocabulary") module_entry_file='src/components/content/Vocabulary/VocabularyContent.tsx' ;;
    "pronunciation") module_entry_file='src/components/content/Pronunciation/PronunciationContent.tsx' ;;
    *) module_entry_file='' ;;
  esac

  cat >> "$curriculum_map" <<EOF
## ${module_order}. ${module_title_cn} / ${module_title_en}

- Folder: \`${module_order}-${module_slug}/\`
- Unit count: ${unit_count}

EOF

  module_overview="$module_dir/00-module-overview.md"
  cat > "$module_overview" <<EOF
# ${module_title_cn} / ${module_title_en}

## Purpose

This folder stores the content planning docs for the \`${module_title_cn}\` module.

## Current source entry

- Module entry file:
  - \`${module_entry_file}\`

## Current unit order

EOF

  current_group=""
  while IFS='|' read -r group_name unit_order unit_slug unit_title_cn unit_title_en unit_source; do
    [[ -z "$unit_order" ]] && continue

    if [[ "$group_name" != "$current_group" ]]; then
      current_group="$group_name"
      cat >> "$module_overview" <<EOF
### ${group_name}

EOF
    fi

    unit_file="${unit_order}-${unit_slug}.md"
    cat >> "$module_overview" <<EOF
- ${unit_order}. [${unit_title_cn} / ${unit_title_en}](./${unit_file})
  - Source: \`${unit_source}\`

EOF

    cat > "$module_dir/$unit_file" <<EOF
# ${unit_title_cn} / ${unit_title_en}

## Basic Info

- Module: ${module_title_cn} / ${module_title_en}
- Track: ${group_name}
- Source file(s): \`${unit_source}\`
- Current status: imported from existing code structure

## Current Goal

- 

## Final Content Spec

### One-line student takeaway

- 

### What to teach

- 

### What not to over-explain

- 

### Minimum examples

- 

### Micro-practice 1

- 

### Micro-practice 2

- 

### Final practice

- 

## UX Notes

- 

## Keep From Current Code

- 

## Remove / Rewrite

- 
EOF
  done <<< "$units"
done

echo "Generated content docs in: $DOCS_DIR"
