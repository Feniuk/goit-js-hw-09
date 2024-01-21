function loadFromLS(key = 'empty') {
    const data = localStorage-getItem(key); 
    try {
    const result = JSON. parse (data) ;
    return result;
    } catch {
    return data;
    }
};