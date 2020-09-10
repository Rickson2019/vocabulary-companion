# coding=utf-8
# txt_to_json.py
# 由 何维龙 于 2020.09.10 创建
# 用于将单词数据格式化为json
import sys
import re
import json


class Converter:
    ARTICLES = ['das', 'die', 'der', '(S.g.)']  # 定冠词

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
            example_start = 1  # 例句开始索引位置

            # 处理定冠词
            if arr[2] in Converter.ARTICLES:
                example_start = 2
            # 处理带横杠的
            if '-' in arr[3] or '(' in arr[3]:
                example_start = 3
            # 单个对象
            item = {
                'id': arr[0],  # 德语单词
                'english_meaning': arr[1],  # 英语单词
                'chinese_meaning': '',  # 中文意思
                'index': int(arr[-2])  # 行号
            }

            examples = arr[example_start+1:-2]  # 例句数组
            # 遍历例句
            for i in range(len(examples)):
                if i % 2 == 0:  # 偶数句为英语
                    item['english_example_sentence_' + str(i // 2 + 1)] = examples[i]
                else:  # 奇数句为德语
                    item['language_example_sentence_' + str(i // 2 + 1)] = examples[i]
            items[arr[0]] = item

        # 将准备好的字典打包为json对象
        data = json.dumps(items, sort_keys=True, indent=4,
                          separators=(',', ': '), ensure_ascii=False)
        self.out_file.write(data)
        self.in_file.close()
        self.out_file.close()


if __name__ == '__main__':
    target_file_name = 'germen_A2.txt'
    if len(sys.argv) > 1:  # 从命令行获取需要处理的文件
        target_file_name = sys.argv[1]

    converter = Converter(target_file_name)
    converter.convert()
