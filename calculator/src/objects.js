export const decimal = {
    'COFloat': 'break',
    'answer': 'decimal',
    'CO': 'COFloat',
    'decimal': 'break',
    'empty': 'decimal',
    'operator': 'decimal,',
    'minus': 'decimal',
    'openParenths': 'decimal'
}

export const closedParenths = {
    'COFloat': 'CO',
    'answer': 'CO',
    'CO': 'CO',
    'decimal': 'CO',
    'empty': 'CO',
    'operator': 'CO',
    'minus': 'break',
    'openParenths': 'break'
}

export const minus = {
    'COFloat': 'minus',
    'answer': 'operator',
    'CO': 'minus',
    'empty': 'minus',
    'decimal': 'break',
    'operator': 'operator',
    'minus': 'break',
    'openParenths': 'minus'
}

export const operator = {
    'COFloat': 'operator',
    'answer': 'operator',
    'CO': 'operator',
    'empty': 'break',
    'decimal': 'break',
    'operator': 'operator',
    'minus': 'operator',
    'openParenths': 'break'
}

export const CO = {
    'COFloat': 'COFloat',
    'answer': 'CO',
    'CO': 'CO',
    'empty': 'CO',
    'decimal': 'COFloat',
    'operator': 'CO',
    'minus': 'CO',
    'openParenths': 'CO'
}

export const openedParenths = {
    'COFloat': 'openParenths',
    'answer': 'openParenths',
    'CO': 'openParenths',
    'empty': 'openParenths',
    'decimal': 'break',
    'operator': 'openParenths',
    'minus': 'openParenths',
    'openParenths': 'openParenths'
}

export const equals = {
    'COFloat': 'answer',
    'answer': 'answer',
    'CO': 'answer',
    'empty': 'answer',
    'decimal': 'break',
    'operator': 'answer',
    'minus': 'break',
    'openParenths': 'break'
}

module.exports = {
    equals,
    decimal,
    closedParenths,
    minus,
    operator,
    CO,
    openedParenths
}