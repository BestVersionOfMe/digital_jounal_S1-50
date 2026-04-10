"""Self-Awareness — journal page 1 (layout aligned with BVM print journal)."""

from __future__ import annotations

import streamlit as st

# Colours tuned to match the light-blue worksheet (approximate).
_COLOR_TITLE = "#2B6A9E"
_COLOR_PAGE_BG_TOP = "#E8EEF6"
_COLOR_PAGE_BG_BOTTOM = "#E4ECF5"
_COLOR_TABLE_HEADER = "#C8D9EB"
_COLOR_TEXTAREA_FILL = "#D4E4F2"
_COLOR_TEXTAREA_BORDER = "#B8CCE0"

# (stable id, label as on journal)
RATING_SKILLS: list[tuple[str, str]] = [
    ("emotional_awareness", "Emotional Awareness"),
    ("honesty", "Honesty"),
    ("seek_feedback", "Seek Feedback"),
    ("self_compassion_skill", "Self Compassion"),
    ("mindfulness", "Mindfulness"),
    ("self_reflection", "Self Reflection"),
]

# First three rows use different widget types (no on-page labels).
_RATING_VARIANT_COMPARE: dict[str, str] = {
    "emotional_awareness": "segmented",
    "honesty": "pills",
    "seek_feedback": "select_slider",
}

OPTIONS_1_TO_5: list[str] = ["1", "2", "3", "4", "5"]

# Same split as each skill row so header 1–5 aligns with controls below.
RATING_COLUMN_RATIO: tuple[float, float] = (1.05, 1.5)

# Width of table header + slider as % of the *right* column (use 100 to align with text areas / red lines).
RATING_TABLE_WIDTH_PCT: int = 100
SLIDER_TRACK_WIDTH_PCT: int = 100

# Horizontal gap between circular pill buttons (Honesty row); increase for more space.
PILL_BUTTON_GAP_REM: float = 1.5

# Segmented control only: five solid fills (light → dark), no CSS gradients on each cell.
SEGMENTED_SOLID_BG: tuple[str, str, str, str, str] = (
    "#eef5fb",
    "#dbeaf7",
    "#bfd9ee",
    "#8eb8db",
    "#5f94c5",
)

# (id, prompt line — matches journal)
COMPASSION_PROMPTS: list[tuple[str, str]] = [
    ("sc_like_self", "What's something you like about yourself?"),
    ("sc_good_at", "What's something you feel you're good at?"),
    ("sc_quality_others", "What's a quality you like about how you treat other people?"),
]


def _css() -> str:
    tw = RATING_TABLE_WIDTH_PCT
    sw = SLIDER_TRACK_WIDTH_PCT
    pg = PILL_BUTTON_GAP_REM
    sg1, sg2, sg3, sg4, sg5 = SEGMENTED_SOLID_BG
    return f"""
<style>
    .stApp {{
        background: linear-gradient(180deg, {_COLOR_PAGE_BG_TOP} 0%, {_COLOR_PAGE_BG_BOTTOM} 100%) !important;
    }}
    [data-testid="stHeader"] {{
        background-color: transparent;
    }}
    section[data-testid="stSidebar"] {{
        background-color: rgba(255,255,255,0.85);
    }}
    .block-container {{
        max-width: 820px;
        padding-top: 1.5rem;
        padding-bottom: 3rem;
    }}
    .bvm-page {{
        font-family: "Segoe UI", system-ui, sans-serif;
        color: #222;
    }}
    .bvm-title-main {{
        color: {_COLOR_TITLE};
        text-align: center;
        font-size: 1.65rem;
        font-weight: 700;
        letter-spacing: 0.12em;
        margin: 0 0 0.75rem 0;
    }}
    .bvm-lead {{
        text-align: center;
        font-size: 1rem;
        line-height: 1.5;
        margin: 0 0 1.75rem 0;
        color: #1a1a1a;
    }}
    .bvm-section-title {{
        color: {_COLOR_TITLE};
        text-align: center;
        font-size: 1.2rem;
        font-weight: 700;
        letter-spacing: 0.1em;
        margin: 2rem 0 0.75rem 0;
    }}
    .bvm-section-intro {{
        text-align: center;
        font-size: 0.98rem;
        line-height: 1.55;
        margin: 0 0 1.25rem 0;
        color: #222;
    }}
    .bvm-prompt {{
        font-size: 0.98rem;
        margin: 1rem 0 0.35rem 0;
        color: #1a1a1a;
    }}
    /* Header row only: two columns equal height (left title + right scale) */
    div[data-testid="stHorizontalBlock"]:has(.bvm-rating-head-cell-left) {{
        align-items: stretch !important;
    }}
    div[data-testid="stHorizontalBlock"]:has(.bvm-rating-head-cell-left) > div[data-testid="column"] > div[data-testid="stVerticalBlock"] {{
        height: 100% !important;
    }}
    /* Markdown wrappers fill column so left/right blocks share one height */
    div[data-testid="stHorizontalBlock"]:has(.bvm-rating-head-cell-left) > div[data-testid="column"]:first-child div[data-testid="stVerticalBlock"] > div,
    div[data-testid="stHorizontalBlock"]:has(.bvm-rating-head-cell-left) > div[data-testid="column"]:nth-child(2) div[data-testid="stVerticalBlock"] > div {{
        height: 100% !important;
    }}
    /* Header left cell — matches first column of skill rows */
    .bvm-rating-head-cell-left {{
        background: {_COLOR_TABLE_HEADER};
        padding: 10px 8px;
        border-radius: 6px 0 0 6px;
        margin-bottom: 8px;
        height: 100%;
        min-height: 0;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        font-weight: 700;
        font-size: 0.72rem;
        letter-spacing: 0.02em;
        color: #1a1a1a;
    }}
    /* 5-col table width — edit RATING_TABLE_WIDTH_PCT in self_awareness.py */
    .bvm-rating-head-table {{
        width: {tw}%;
        height: 100%;
        table-layout: fixed;
        border-collapse: collapse;
        margin-bottom: 8px;
        background: {_COLOR_TABLE_HEADER};
        border-radius: 0 6px 6px 0;
        font-weight: 600;
        font-size: 0.65rem;
        color: #1a1a1a;
        line-height: 1.15;
    }}
    .bvm-rating-head-table tr {{
        height: 100%;
    }}
    .bvm-rating-head-table td {{
        width: 20%;
        text-align: center;
        vertical-align: middle;
        padding: 6px 2px;
        box-sizing: border-box;
        white-space: normal;
        word-wrap: break-word;
        overflow-wrap: anywhere;
        hyphens: auto;
    }}
    .bvm-rating-head-note {{
        font-weight: 400;
        font-size: 0.58rem;
        display: block;
        max-width: 100%;
        white-space: normal;
        word-wrap: break-word;
        overflow-wrap: anywhere;
        line-height: 1.1;
    }}
    .bvm-footer-page {{
        margin-top: 2.5rem;
        display: flex;
        justify-content: flex-start;
    }}
    .bvm-page-num {{
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        border: 2px solid #555;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.95rem;
        font-weight: 600;
        color: #333;
    }}
    div[data-testid="stTextArea"] textarea {{
        background-color: {_COLOR_TEXTAREA_FILL} !important;
        border-radius: 14px !important;
        border: 1px solid {_COLOR_TEXTAREA_BORDER} !important;
        padding: 12px 14px !important;
        min-height: 96px !important;
    }}
    /* Rating grid: 2nd column — full width; strip inset so edges line up with text areas below */
    .block-container div[data-testid="stHorizontalBlock"] > div[data-testid="column"]:nth-child(2) > div[data-testid="stVerticalBlock"] {{
        padding-left: 0 !important;
        padding-right: 0 !important;
        width: 100% !important;
        max-width: 100% !important;
    }}
    /* Streamlit often wraps widgets in a block that stays narrow — stretch to column width */
    .block-container div[data-testid="stHorizontalBlock"] > div[data-testid="column"]:nth-child(2) {{
        min-width: 0 !important;
        flex: 1.5 1 0% !important;
    }}
    .block-container div[data-testid="stHorizontalBlock"] > div[data-testid="column"]:nth-child(2) div[data-testid="stVerticalBlock"] > div {{
        width: 100% !important;
        max-width: 100% !important;
    }}
    /* Segmented / Pills: full row width + slightly larger tap targets */
    div[data-testid="stSegmentedControl"],
    div[data-testid="stButtonGroup"],
    div[data-testid="stPills"] {{
        display: flex !important;
        flex-wrap: nowrap !important;
        width: 100% !important;
        max-width: none !important;
        min-width: 100% !important;
        justify-content: stretch;
        align-items: stretch;
        box-sizing: border-box;
    }}
    div[role="radiogroup"] {{
        display: flex !important;
        flex: 1 1 auto !important;
        min-width: 0 !important;
        width: 100% !important;
    }}
    /* Segmented: one connected bar — no gap between segments (only when segmented buttons present) */
    div[data-testid="stSegmentedControl"],
    div[data-testid="stButtonGroup"]:has(button[data-testid="stBaseButton-segmented_control"]) {{
        gap: 0 !important;
    }}
    /* Pills (round buttons): space between — edit PILL_BUTTON_GAP_REM at top of file */
    div[data-testid="stPills"] {{
        gap: {pg}rem !important;
    }}
    div[data-testid="stSegmentedControl"] > *,
    div[data-testid="stButtonGroup"] > *,
    div[data-testid="stPills"] > * {{
        flex: 1 1 0 !important;
        min-width: 0 !important;
    }}
    div[data-testid="stSegmentedControl"] button,
    div[data-testid="stButtonGroup"] button,
    div[data-testid="stPills"] button {{
        min-height: 2.75rem !important;
        padding: 0.45rem 0.15rem !important;
        font-size: 0.95rem !important;
        font-weight: 600 !important;
    }}
    /*
     * Segmented row (Streamlit ≥1.30): div[role="radiogroup"] > button[data-testid="stBaseButton-segmented_control"] ×5
     * Solid fills only; selected = extra outline (same palette).
     */
    div[role="radiogroup"] > button[data-testid="stBaseButton-segmented_control"]:nth-of-type(1) {{
        background-color: {sg1} !important;
        background-image: none !important;
        color: #1a1a1a !important;
        border-color: rgba(30, 60, 90, 0.14) !important;
        -webkit-text-fill-color: #1a1a1a !important;
    }}
    div[role="radiogroup"] > button[data-testid="stBaseButton-segmented_control"]:nth-of-type(2) {{
        background-color: {sg2} !important;
        background-image: none !important;
        color: #1a1a1a !important;
        border-color: rgba(30, 60, 90, 0.15) !important;
        -webkit-text-fill-color: #1a1a1a !important;
    }}
    div[role="radiogroup"] > button[data-testid="stBaseButton-segmented_control"]:nth-of-type(3) {{
        background-color: {sg3} !important;
        background-image: none !important;
        color: #1a1a1a !important;
        border-color: rgba(30, 60, 90, 0.16) !important;
        -webkit-text-fill-color: #1a1a1a !important;
    }}
    div[role="radiogroup"] > button[data-testid="stBaseButton-segmented_control"]:nth-of-type(4) {{
        background-color: {sg4} !important;
        background-image: none !important;
        color: #1a1a1a !important;
        border-color: rgba(30, 60, 90, 0.18) !important;
        -webkit-text-fill-color: #1a1a1a !important;
    }}
    div[role="radiogroup"] > button[data-testid="stBaseButton-segmented_control"]:nth-of-type(5) {{
        background-color: {sg5} !important;
        background-image: none !important;
        color: #1a1a1a !important;
        border-color: rgba(30, 60, 90, 0.2) !important;
        -webkit-text-fill-color: #1a1a1a !important;
    }}
    div[role="radiogroup"] > button[data-testid="stBaseButton-segmented_control"][aria-pressed="true"],
    div[role="radiogroup"] > button[data-testid="stBaseButton-segmented_control"][aria-checked="true"] {{
        outline: 2px solid rgba(0, 0, 0, 0.32) !important;
        outline-offset: -2px !important;
        z-index: 1 !important;
    }}
    div[role="radiogroup"] > button[data-testid="stBaseButton-segmented_control"]:hover {{
        filter: brightness(1.03);
    }}
    div[role="radiogroup"] > button[data-testid="stBaseButton-segmented_control"]:active {{
        filter: brightness(0.97);
    }}
    /* Slider width — edit SLIDER_TRACK_WIDTH_PCT in self_awareness.py; inner [data-baseweb="slider"] must follow */
    .block-container div[data-testid="stHorizontalBlock"] > div[data-testid="column"]:nth-child(2) div[data-testid="stSlider"] {{
        width: {sw}% !important;
        max-width: {sw}% !important;
        min-width: 0 !important;
        box-sizing: border-box !important;
        padding-top: 0.35rem;
        padding-bottom: 0.15rem;
    }}
    .block-container div[data-testid="stHorizontalBlock"] > div[data-testid="column"]:nth-child(2) div[data-testid="stSlider"] > div {{
        width: 100% !important;
        max-width: 100% !important;
        min-width: 0 !important;
        box-sizing: border-box !important;
    }}
    .block-container div[data-testid="stHorizontalBlock"] > div[data-testid="column"]:nth-child(2) div[data-testid="stSlider"] [data-baseweb="slider"] {{
        width: 100% !important;
        max-width: 100% !important;
    }}
</style>
"""


def _rating_row_columns():
    """Match header row to skill rows (aligns 1–5 with segmented / pills / slider)."""
    return st.columns(list(RATING_COLUMN_RATIO), gap="small")


def _init_ratings(prefix: str) -> None:
    for sid, _ in RATING_SKILLS:
        key = f"{prefix}_rate_{sid}"
        if key not in st.session_state:
            # select_slider cannot store None — value must be in OPTIONS_1_TO_5.
            st.session_state[key] = "3" if sid == "seek_feedback" else None


def _init_compassion(prefix: str) -> None:
    for pid, _ in COMPASSION_PROMPTS:
        key = f"{prefix}_{pid}"
        if key not in st.session_state:
            st.session_state[key] = ""


def _render_rating_control(label: str, widget_key: str, variant: str) -> None:
    """Render a 1–5 control; `variant` is segmented | pills | select_slider."""
    if variant == "segmented":
        st.segmented_control(
            label,
            options=OPTIONS_1_TO_5,
            selection_mode="single",
            default=None,
            key=widget_key,
            label_visibility="collapsed",
            width="stretch",
        )
    elif variant == "pills":
        st.pills(
            label,
            options=OPTIONS_1_TO_5,
            selection_mode="single",
            default=None,
            key=widget_key,
            label_visibility="collapsed",
            width="stretch",
        )
    elif variant == "select_slider":
        # Must be a member of options; session may still be None from older runs — coerce.
        cur = st.session_state.get(widget_key)
        if cur not in OPTIONS_1_TO_5:
            st.session_state[widget_key] = "3"
        st.select_slider(
            label,
            options=OPTIONS_1_TO_5,
            key=widget_key,
            label_visibility="collapsed",
            width="stretch",
        )
    else:
        st.segmented_control(
            label,
            options=OPTIONS_1_TO_5,
            selection_mode="single",
            default=None,
            key=widget_key,
            label_visibility="collapsed",
            width="stretch",
        )


def _export_markdown(prefix: str) -> str:
    lines = ["# Self-Awareness — page 1", ""]
    lines.append("## Self-Awareness skills rating (1 = low, 5 = high)")
    lines.append("")
    for sid, label in RATING_SKILLS:
        k = f"{prefix}_rate_{sid}"
        v = st.session_state.get(k)
        lines.append(f"- **{label}:** {v if v is not None else '_(not selected)_'}")
    lines.append("")
    lines.append("## Self compassion")
    lines.append("")
    for pid, prompt in COMPASSION_PROMPTS:
        k = f"{prefix}_{pid}"
        body = st.session_state.get(k, "").strip()
        lines.append(f"### {prompt}")
        lines.append("")
        lines.append(body or "_(empty)_")
        lines.append("")
    return "\n".join(lines)


def render_self_awareness(*, state_prefix: str = "sa") -> None:
    """Journal page 1: skills rating + self compassion prompts (print layout–like)."""
    st.markdown(_css(), unsafe_allow_html=True)
    _init_ratings(state_prefix)
    _init_compassion(state_prefix)

    st.markdown(
        f"""
<div class="bvm-page">
  <h1 class="bvm-title-main">SELF-AWARENESS</h1>
  <p class="bvm-lead">Self-awareness is understanding your thoughts, feelings, and behaviours.</p>
</div>
""",
        unsafe_allow_html=True,
    )

    hl, hr = _rating_row_columns()
    with hl:
        st.markdown(
            '<div class="bvm-rating-head-cell-left">SELF-AWARENESS SKILLS RATING</div>',
            unsafe_allow_html=True,
        )
    with hr:
        st.markdown(
            """
<table class="bvm-rating-head-table">
  <tr>
    <td>1<br/><span class="bvm-rating-head-note">very<br/>weak</span></td>
    <td>2<br/><span class="bvm-rating-head-note">weak</span></td>
    <td>3<br/><span class="bvm-rating-head-note">mid</span></td>
    <td>4<br/><span class="bvm-rating-head-note">strong</span></td>
    <td>5<br/><span class="bvm-rating-head-note">very<br/>strong</span></td>
  </tr>
</table>
""",
            unsafe_allow_html=True,
        )

    for sid, label in RATING_SKILLS:
        variant = _RATING_VARIANT_COMPARE.get(sid, "segmented")
        widget_key = f"{state_prefix}_rate_{sid}"
        left, right = _rating_row_columns()
        with left:
            st.markdown(f"**{label}**")
        with right:
            _render_rating_control(label, widget_key, variant)

    st.markdown(
        """
<h2 class="bvm-section-title">SELF COMPASSION</h2>
<p class="bvm-section-intro">Being kind to ourselves isn't always our first instinct but it's one of the most powerful habits we can build.</p>
""",
        unsafe_allow_html=True,
    )

    for pid, prompt in COMPASSION_PROMPTS:
        st.markdown(f'<p class="bvm-prompt">{prompt}</p>', unsafe_allow_html=True)
        st.text_area(
            prompt,
            label_visibility="collapsed",
            placeholder="Write here…",
            key=f"{state_prefix}_{pid}",
            height=120,
        )

    st.markdown(
        """
<div class="bvm-footer-page">
  <div class="bvm-page-num">1</div>
</div>
""",
        unsafe_allow_html=True,
    )

    st.divider()
    export = _export_markdown(state_prefix)
    st.caption("Prototype: entries stay in this browser session only.")
    st.download_button(
        label="Download this page as Markdown",
        data=export.encode("utf-8"),
        file_name="bvm_self_awareness_page1.md",
        mime="text/markdown",
    )
