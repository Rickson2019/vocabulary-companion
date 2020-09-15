# coding=utf-8
# txt_to_json.py
# 由 何维龙 于 2020.09.10 创建
# 用于将单词数据格式化为json
import sys
import re
import json


class Converter:
    ARTICLES = ['das', 'die', 'der']  # 定冠词
    SINGULAR = ['(S.g.)', '(Sg.)', '(s.g.)', '(sg.)', '(S.G.)', '(SG.)', '(s.G.)']  # 单复同形
    GENDER_MAPPING = {'das': 'masculine',
                      'die': 'feminine',
                      'der': 'masculine'}  # gender和定冠词的对应
    WORD_INDEX = 0          # 原本单词的位置
    ENGLISH_WORD_INDEX = 1  # 英文单词的位置
    ARTICLE_INDEX = 2       # 定冠词的位置
    SINGULAR_INDEX = 3      # 单复数形式的位置
    LINE_INDEX = -2         # 行号的位置（倒数）

    def __init__(self, file_name):
        self.in_file = open(file_name, 'r', encoding='utf-8')
        self.out_file = open(file_name[:-4] + '.json', 'w', encoding='utf-8')

    def convert(self):
        """将txt转换为json"""
        lines = self.in_file.readlines()  # 按行读取
        items = {}  # 根json
        for line in lines:
            line = line.replace('"', '')  # 清除所有引号，防止干扰
            arr = re.split('\t+', line)  # 以制表符切分
            print('Saving ' + arr[Converter.WORD_INDEX])
            example_start = Converter.ARTICLE_INDEX  # 例句开始索引位置（从定冠词位置开始才有可能是例句）

            # 处理定冠词, gender, 单复数（2号位）
            article = None
            gender = None
            plural = None
            if arr[Converter.ARTICLE_INDEX] in Converter.ARTICLES or \
                    arr[Converter.ARTICLE_INDEX] in Converter.SINGULAR:
                example_start = Converter.ARTICLE_INDEX + 1
                curr_itm = arr[Converter.ARTICLE_INDEX]

                # 第2号位置也可能有 S.G.
                if curr_itm in Converter.SINGULAR:
                    plural = '(s.g.)'  # 莫得定冠词就不管了
                else:  # 不是s.g.那就是定冠词了
                    article = curr_itm
                    gender = Converter.GENDER_MAPPING[curr_itm]
            # 处理带横杠的（3号位）（例句中也可能有横杠，用正则表达式筛选）
            if re.match('-[a-z]*', arr[Converter.SINGULAR_INDEX]) or \
                    arr[Converter.SINGULAR_INDEX] in Converter.SINGULAR:
                example_start = Converter.SINGULAR_INDEX + 1

            # 单个词汇对象
            item = {
                'id': arr[Converter.WORD_INDEX],  # 德语单词
                'english_meaning': arr[Converter.ENGLISH_WORD_INDEX],  # 英语单词
                'chinese_meaning': '',  # 中文意思
                'index': int(arr[Converter.LINE_INDEX]),  # 行号
                'part_of_speech': None,
                'gender': gender,
                'pronunciation': None,
                'article': article,
                'plural': plural,
            }

            # 处理例句
            examples = arr[example_start:Converter.LINE_INDEX]  # 截取例句数组
            # 匹配过去式完成时什么的（顾问说的）
            # 这个东西不是例句，所以要丢弃，否则会导致后面的英文和德文例句顺序颠倒
            # 但是leidtun这个单词还有特殊的东西，不过只有它一个有问题，可以手动处理
            if re.match('[A-Za-zÄäÖöẞßÜü, ]+, hat [A-Za-zÄäÖöẞßÜü, ]+', examples[0]):
                examples = examples[1:]  # 截取例句数组
            # 遍历例句
            for i in range(len(examples)):
                if i % 2 == 0:  # 偶数句为德语
                    item['language_example_sentence_' + str(i // 2 + 1)] = examples[i]
                else:  # 奇数句为英语
                    item['english_example_sentence_' + str(i // 2 + 1)] = examples[i]

            items[arr[Converter.WORD_INDEX]] = item

        # 将准备好的字典打包为json对象
        data = json.dumps(items, sort_keys=True, indent=4,
                          separators=(',', ': '), ensure_ascii=False)
        self.out_file.write(data)
        self.in_file.close()
        self.out_file.close()


if __name__ == '__main__':
    target_file_name = 'german_A2.txt'
    if len(sys.argv) > 1:  # 从命令行获取需要处理的文件
        target_file_name = sys.argv[1]

    converter = Converter(target_file_name)
    converter.convert()
