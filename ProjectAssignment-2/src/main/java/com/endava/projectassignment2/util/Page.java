package com.endava.projectassignment2.util;

import java.util.List;

public class Page<T> {

    private List<T> content;
    private long totalElements;
    private int totalPages;
    private int pageNumber;
    private int pageSize;

    public Page(List<T> content, long totalElements, int pageNumber, int pageSize) {
        this.content = content;
        this.totalElements = totalElements;
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
        this.totalPages = (int) Math.ceil((double) totalElements / pageSize);
    }

    public List<T> getContent() {
        return content;
    }

    public long getTotalElements() {
        return totalElements;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public int getPageNumber() {
        return pageNumber;
    }

    public int getPageSize() {
        return pageSize;
    }
}


