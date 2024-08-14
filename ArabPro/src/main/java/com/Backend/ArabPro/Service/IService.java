package com.Backend.ArabPro.Service;

import java.util.List;

public interface IService<T> {
    T Create (T t );
    T Update(T t);
    T Retrieve(Long id);
    List<T> Retrieve();
    void Delete(Long id);
}
