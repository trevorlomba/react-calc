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
    answer: ['CO'],
    CO: ['CO'],
    decimal: ['CO'],
    empty: ['CO'],
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
    operator: ['operator', false, 'preVal'],
    minus: ['break'],
    openParenths: ['minus'],
}

export const operator = {
    COFloat: ['operator'],
    answer: ['operator'],
    CO: ['operator'],
    empty: ['break'],
    decimal: ['break'],
    operator: ['operator', false, 'preVal'],
    minus: ['operator', false, 'preVal'],
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
    doMath: 1,
    COLength: 0,
    COFloat: ['answer', true],
    answer: ['break', true],
    CO: ['answer', true],
    empty: ['answer', true],
    decimal: ['break', true],
    operator: ['answer', false, 'preVal'],
    minus: ['break', true],
    openParenths: ['break', true],
}


export const clear = {
    COFloat: ['answer', false, 'COL'],
    answer: ['answer', true],
    CO: ['answer', false, 'COL'],
    empty: ['answer', false, 'COL'],
    decimal: ['break', false, 'COL'],
    operator: ['answer', false, 'COL'],
    minus: ['break', false],
    openParenths: ['answer', true],
}