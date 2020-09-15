{all_word_lists.length > 0 &&
    <div>
        {/* {all_word_lists[item_index].map((item, index) => (
            <div>
                <TextField className={classes.engStn} defaultValue={item.english_example_sentence_1} />
                <br/>
                <TextField className={classes.langStn} defaultValue={item.language_example_sentence_1} />
                
                <Fragment>
                {item_index > 0 && <Button >Last</Button>}
                <Button >Next</Button>
                    </Fragment>
            </div>
        ))} */}

        <Fragment>
            <TextField id='word_id_TextField' className={classes.wordId} label={'Word ID'} defaultValue={all_word_lists[item_index].id} />
            <Divider />

            <TextField id='english_meaning_TextField' className={classes.enMeaning} label={'English Meaning'} defaultValue={all_word_lists[item_index].english_meaning} />
            <Divider />

            <TextField id='chinese_meaning_TextField' className={classes.cnMeaning} label={'Chinese Meaning'} defaultValue={all_word_lists[item_index].chinese_meaning} />
            <Divider />

            <TextField id='english_example_sentence_1' className={classes.engStn} label={'english_example_sentence_1'} defaultValue={all_word_lists[item_index].english_example_sentence_1} />
            <Divider />

            <TextField id='language_example_sentence_1' className={classes.langStn} label={'language_example_sentence_1'} defaultValue={all_word_lists[item_index].language_example_sentence_1} />
            <Divider />

            <TextField id='english_example_sentence_2' className={classes.engStn} label={'english_example_sentence_2'} defaultValue={all_word_lists[item_index].english_example_sentence_1} />
            <Divider />

            <TextField id='language_example_sentence_2' className={classes.langStn} label={'language_example_sentence_2'} defaultValue={all_word_lists[item_index].language_example_sentence_1} />
            <Divider />

            <TextField id='english_example_sentence_3' className={classes.engStn} label={'english_example_sentence_2'} defaultValue={all_word_lists[item_index].english_example_sentence_1} />
            <Divider />

            <TextField id='language_example_sentence_3' className={classes.langStn} label={'language_example_sentence_2'} defaultValue={all_word_lists[item_index].language_example_sentence_1} />
            <Divider />

            <Button className={classes.updateBtn} onClick={updateByID} >Update</Button>
            <Fragment>
                {item_index > 0 && <Button color='secondary' variant='contained' onClick={handleLast} >Last</Button>}
                <Button color='primary' variant='contained' onClick={handleNext}>Next</Button>

            </Fragment>

        </Fragment>

    </div>
}