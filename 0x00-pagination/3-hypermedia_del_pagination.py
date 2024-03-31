#!/usr/bin/env python3
"""
Module: 3-hypermedia_del_pagination.py

Deletion-resilient hypermedia pagination
"""


import csv
import math
from typing import List, Dict


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None
        self.__indexed_dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def indexed_dataset(self) -> Dict[int, List]:
        """Dataset indexed by sorting position, starting at 0
        """
        if self.__indexed_dataset is None:
            dataset = self.dataset()
            truncated_dataset = dataset[:1000]
            self.__indexed_dataset = {
                i: dataset[i] for i in range(len(dataset))
            }
        return self.__indexed_dataset

    def get_hyper_index(self, index: int = None, page_size: int = 10) -> Dict:
        """
        This function takes two integer args:
        index: None as default value
        page_size: default value of 10

        index: current start of index of return page
        next_index: the next index to query with
        page_size: the current page_size
        data: the actual page of the dataset
        """
        dataset = self.indexed_dataset()
        max_index = len(dataset) - 1
        assert index is None or (
                isinstance(index, int) and 0 <= index <= max_index), \
            "Index should be in valid range"

        if index is None:
            index = 0

        next_index = min(index + page_size, max_index + 1)

        if index not in dataset:
            index = next(
                    (i for i in range(
                        index, max_index + 1) if i in dataset), None)
            if index is None:
                return {
                        "index": None,
                        "next_index": None,
                        "page_size": page_size,
                        "data": []
                        }
            next_index = min(index + page_size, max_index + 1)

        return {
                "index": index,
                "next_index": next_index,
                "page_size": page_size,
                "data": [dataset[i] for i in range(
                    index, min(next_index, max_index + 1))]
                }
