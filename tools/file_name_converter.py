# coding=utf-8
# file_name_converter.py
# 由 何维龙 于 2020.09.13 创建
# 用于将文件名转换为英文
import os
import shutil
import json

list = []


class Converter:

    def __init__(self):
        file_content = open('../src/Data/essential_french.json', 'r',
                            encoding='utf-8').read()  # 一次性读取文件全部内容
        # 删去隐藏字符，要不然会报错
        # 参考资料：https://www.cnblogs.com/hankleo/p/10511523.html
        if file_content.startswith(u'\ufeff'):
            file_content = file_content.encode('utf8')[3:].decode('utf8')
        self.dictionary = json.loads(file_content)['Essential French']
        self.source_path = '../public/images/essential_french'  # 源目录
        self.target_path = '../public/images/essential_french/english'  # 目标目录

    def convert(self):
        """将文件名转换为英文"""
        for file_name in os.listdir(self.source_path):
            source_file_path = os.path.join(self.source_path, file_name)
            if os.path.isfile(source_file_path):
                print('Copy ' + source_file_path)
                word, extension = tuple(file_name.split('.'))  # 拆分文件名
                try:
                    target_file_path = os.path.join(  # 拼接目标文件路径
                        self.target_path,
                        (self.dictionary[word]['english_meaning'].lower()  # 英文单词
                         if self.dictionary[word]['english_meaning'] else word.lower()) +  # 如果这个单词的英文是None就用原文
                        '.' + extension)  # 文件扩展名
                except KeyError:  # 找不到这个单词
                    print(word)
                    list.append(word.lower())

                # 复制文件
                shutil.copyfile(source_file_path, target_file_path)

    print(list)


if __name__ == '__main__':
    converter = Converter()
    converter.convert()
    print(list)
