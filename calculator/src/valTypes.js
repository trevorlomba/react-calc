export const decimal = {
    test: ['test', false, 1],
    COFloat: ['break'],
    answer: ['decimal', true],
    CO: ['COFloat'],
    decimal: ['break'],
    empty: ['decimal'],
    operator: 'decimal,',
    minus: ['decimal'],
    openParenths: ['decimal'],
}

export const closedParenths = {
    parenths: -1,
    COFloat: ['CO'],
    answer: ['break'],
    CO: ['CO'],
    decimal: ['CO'],
    empty: ['answer'],
    operator: ['CO'],
    minus: ['break'],
    openParenths: ['break'],
}

export const minus = {
    COFloat: ['minus'],
    answer: ['operator'],
    CO: ['minus'],
    empty: ['minus'],
    decimal: ['break'],
    operator: ['operator', false, 'previousVal'],
    minus: ['break'],
    openParenths: ['minus'],
}

export const operator = {
    COFloat: ['operator'],
    answer: ['operator'],
    CO: ['operator'],
    empty: ['break'],
    decimal: ['break'],
    operator: ['operator', false, 'previousVal'],
    minus: ['operator', false, 'previousVal'],
    openParenths: ['break'],
}

export const CO = {
    COFloat: ['COFloat'],
    answer: ['CO', true],
    CO: ['CO'],
    empty: ['CO'],
    decimal: ['COFloat'],
    operator: ['CO'],
    minus: ['CO'],
    openParenths: ['CO'],
}

export const openedParenths = {
    parenths: 1,
    COFloat: ['openParenths'],
    answer: ['openParenths', true],
    CO: ['openParenths'],
    empty: ['openParenths'],
    decimal: ['break'],
    operator: ['openParenths'],
    minus: ['openParenths'],
    openParenths: ['openParenths'],
}

export const equals = {
    COFloat: ['answer', true, false, true],
    answer: ['break'],
    CO: ['answer', true, false, true],
    empty: ['empty', true, false, true],
    decimal: ['break'],
    operator: ['answer', false, 'previousVal', true],
    minus: ['break'],
    openParenths: ['break'],
}


export const clear = {
    COFloat: ['answer', false, 'COL'],
    clear: ['answer', true],
    CO: ['answer', false, 'COL'],
    empty: ['answer', false, 'COL'],
    decimal: ['answer', false, 'COL'],
    operator: ['answer', false, 'COL'],
    minus: ['answer', false],
    openParenths: ['answer', true],
    answer: ['empty', true],
}



export const expression = {
    parenths: 1,
    COFloat: ['expression'],
    answer: ['expression', true, false, true],
    CO: ['expression'],
    empty: ['expression'],
    decimal: ['break'],
    operator: ['expression'],
    minus: ['expression'],
    openParenths: ['openParenths'],
}