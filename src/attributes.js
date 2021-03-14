const admin_input_types = {
    word_id: 'word_id',
    language_example_sentence: 'language_example_sentence',
    english_example_sentence: 'english_example_sentence',
    english_meaning: 'english_meaning',
    chinese_meaning: 'chinese_meaning',
    chinese_example_sentence: 'chinese_example_sentence'
}

const input_group_types = {
    NEW_WORD: 'NEW WORD',
    WORD_MEANING: 'WORD MEANING',
    EXAMPLE_SENTENCE: 'EXAMPLE SENTENCE'
}

const input_groups_id_tracker_schema = {
    word_meaning_count: 1,
    example_sentencec_count: 1
}


module.exports = {
    admin_input_types,
    input_group_types,
    input_groups_id_tracker_schema
}