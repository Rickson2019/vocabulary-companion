// Admin 的 input textfield 类型
const admin_input_types = {
    word_id: 'word_id',
    language_example_sentence: 'language_example_sentence',
    english_example_sentence: 'english_example_sentence',
    english_meaning: 'english_meaning',
    chinese_meaning: 'chinese_meaning',
    chinese_example_sentence: 'chinese_example_sentence'
}

// 可供选择的 input textfield 组群类型
const input_group_types = {
    NEW_WORD: 'NEW WORD',
    WORD_MEANING: 'WORD MEANING',
    EXAMPLE_SENTENCE: 'EXAMPLE SENTENCE'
}

// 初始化的groups tracker
const input_groups_id_tracker_schema = {
    word_meaning_count: 1,
    example_sentence_count: 1
}

// ADMIN STATE MACHINE (for rendering)
const admin_page_states = {
    LOADING_LANGUAGE_LIST: 0,
    PICK_A_LANGUAGE_TO_MANAGE: 1,
    CHOOSE_A_WORD_LIST_TO_MODIFY: 2,
    LOADING_WORD_LIST: 3,
    MODIFY_WORD_INFO: 4,
    SAVING_CHANGES: 5
}

// Module exported the types for rendering 
module.exports = {
    admin_input_types,
    input_group_types,
    input_groups_id_tracker_schema,
    admin_page_states
}