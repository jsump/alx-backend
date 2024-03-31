#!/usr/bin/env python3
"""
Module: 1-simple_pagination.py

this module contains a function that takes 2 integers
and returns a tuple of size two conatining a start index
"""


import csv
import math
from typing import List
from typing import Tuple


def index_range(page: int, page_size: int) -> tuple:
    """
    This module takes two integers: page and page_size

    Return a tuple size two conatining a start index and an index
    correspondiign to the range of indexes to return a list for those
    particular pagination parameters.

    Page numbers are 1-indexed, i.e the first page is page one
    """
    start_index = (page - 1) * page_size
    end_index = start_index + page_size

    return (start_index, end_index)


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """
        This function takes two interger arguements with default values

        Use CSV file
        Use assert to verify that both arguments are intgers > 0
        Use inde_range to find incorrect indexes to paginate
        the dataset correctly and return the appropriate page
        of the dataset(i.e the corret list of rows.

        Return emply list if the input arguments are out of range
        for the dataset

        page: args, default value of 1
        page_size: args, default value of 10
        """
        assert isinstance(page, int) and page > 0,
        "Page should be an integer > 0"

        assert isinstance(page_size, int) and page_size > 0,
        "Page size hsould be an integer > 0"

        start_index, end_index = index_range(page, page_size)
        dataset = self.dataset()
        if start_index >= len(dataset):
            """if starting index > length of the dataset"""
            return []
        return dataset[start_index:end_index]
