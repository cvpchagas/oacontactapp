import React from 'react';

import MaskedInput from 'react-text-mask';

import CurrencyInput from 'react-currency-input';

const MASKS = {
	date: [
		/[0-9]/,
		/[0-9]/,
		'/',
		/[0-9]/,
		/[0-9]/,
		'/',
		/[0-9]/,
		/[0-9]/,
		/[0-9]/,
		/[0-9]/
	],
	datemonthyear: [/[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/],
	cpf: [
		/[0-9]/,
		/[0-9]/,
		/[0-9]/,
		'.',
		/[0-9]/,
		/[0-9]/,
		/[0-9]/,
		'.',
		/[0-9]/,
		/[0-9]/,
		/[0-9]/,
		'-',
		/[0-9]/,
		/[0-9]/
	],
	cnpj: [
		/[0-9]/,
		/[0-9]/,
		'.',
		/[0-9]/,
		/[0-9]/,
		/[0-9]/,
		'.',
		/[0-9]/,
		/[0-9]/,
		/[0-9]/,
		'/',
		/[0-9]/,
		/[0-9]/,
		/[0-9]/,
		/[0-9]/,
		'-',
		/[0-9]/,
		/[0-9]/
	],
	cep: [
		/[0-9]/,
		/[0-9]/,
		/[0-9]/,
		/[0-9]/,
		/[0-9]/,
		'-',
		/[0-9]/,
		/[0-9]/,
		/[0-9]/
	],
	code: [/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/]
};

export function DateMaskCustom(props) {
	const { inputRef, ...other } = props;
	return (
		<MaskedInput
			{...other}
			guide
			keepCharPositions
			ref={(ref) => {
				inputRef(ref ? ref.inputElement : null);
			}}
			mask={MASKS.date}
		/>
	);
}

export function CodeMaskCustom(props) {
	const { inputRef, ...other } = props;
	return (
		<MaskedInput
			{...other}
			guide
			keepCharPositions
			ref={(ref) => {
				inputRef(ref ? ref.inputElement : null);
			}}
			mask={MASKS.code}
		/>
	);
}

export function DateMesAnoMaskCustom(props) {
	const { inputRef, ...other } = props;
	return (
		<MaskedInput
			{...other}
			guide
			keepCharPositions
			ref={(ref) => {
				inputRef(ref ? ref.inputElement : null);
			}}
			mask={MASKS.datemonthyear}
		/>
	);
}

export function CpfMaskCustom(props) {
	const { inputRef, ...other } = props;
	return (
		<MaskedInput
			{...other}
			guide
			keepCharPositions
			ref={(ref) => {
				inputRef(ref ? ref.inputElement : null);
			}}
			mask={MASKS.cpf}
		/>
	);
}

export function CnpjMaskCustom(props) {
	const { inputRef, ...other } = props;

	return (
		<MaskedInput
			{...other}
			guide
			keepCharPositions
			ref={(ref) => {
				inputRef(ref ? ref.inputElement : null);
			}}
			mask={MASKS.cnpj}
		/>
	);
}

export function CpfCnpjMaskCustom(props) {
	const { inputRef, ...other } = props;

	const dynamicMask = rawValue => {
		if (rawValue.replace(/\D/g, '').length <= 11) {
			return MASKS.cpf;
		}

		return MASKS.cnpj;
	};

	return (
		<MaskedInput
			{...other}
			ref={(ref) => {
				inputRef(ref ? ref.inputElement : null);
			}}
			mask={dynamicMask}
			placeholderChar={'\u2000'}
		/>
	);
}

export function CepMaskCustom(props) {
	const { inputRef, ...other } = props;
	return (
		<MaskedInput
			{...other}
			ref={(ref) => {
				inputRef(ref ? ref.inputElement : null);
			}}
			mask={MASKS.cep}
			placeholderChar={'\u2000'}
		/>
	);
}

export function MoneyMaskCustom(props) {
	const { inputRef, mask, ...other } = props;

	return (
		<CurrencyInput
			{...other}
			ref={(ref) => {
				inputRef(ref ? ref.inputElement : null);
			}}
			decimalSeparator=","
			thousandSeparator="."
			maxLength={12}
		/>
	);
}

export function maskCode(code) {
	code = code.replace(/\D/g, '');
	code = code.replace(/(\d{5})(\d{1})/g, '$1-$2');
	if (code.length > 7) code = code.substr(0, 7);
	return code;
}

export function maskPhone(value) {
	if (!value) return '';

	let texto = value.replace(/[^\d]/g, '');
	if (texto.length > 0) {
		if (texto.length > 11) texto = texto.substr(0, 11);

		texto = '(' + texto;

		if (texto.length > 3) {
			texto = [texto.slice(0, 3), ')', texto.slice(3)].join('');
		}
		if (texto.length > 11) {
			if (texto.length > 12)
				texto = [texto.slice(0, 9), '-', texto.slice(9)].join('');
			else texto = [texto.slice(0, 8), '-', texto.slice(8)].join('');
		}
	}
	return texto;
}

export function maskCpf(value) {
	if (!value) return '';

	value = value.replace(/\D/g, '');
	if (value.length > 11) value = value.substr(0, 11);
	return formataCampo('000.000.000-00', value);
}

export function maskCep(value) {
	if (!value) return '';

	value = value.replace(/\D/g, '');
	if (value.length > 8) value = value.substr(0, 8);
	return formataCampo('00000-000', value);
}

export function maskDate(value) {
	if (!value) return '';

	value = value.replace(/\D/g, '');
	if (value.length > 8) value = value.substr(0, 8);
	return formataCampo('00/00/0000', value);
}

export function maskCurrency(
	value,
	precision = 2,
	decimalSeparator = ',',
	thousandSeparator = '.',
	allowNegative = false,
	prefix = '',
	suffix = ''
) {
	if (value === null || value === undefined || value === 'null') {
		return 'R$ 0,00';
	}

	value = String(value);

	if (value.length === 0) {
		return 'R$ 0,00';
	}

	var digits = value.match(/\d/g) || ['0'];

	var numberIsNegative = false;
	if (allowNegative) {
		var negativeSignCount = (value.match(/-/g) || []).length;

		numberIsNegative = negativeSignCount % 2 === 1;

		var allDigitsAreZero = true;
		for (var idx = 0; idx < digits.length; idx += 1) {
			if (digits[idx] !== '0') {
				allDigitsAreZero = false;
				break;
			}
		}
		if (allDigitsAreZero) {
			numberIsNegative = false;
		}
	}

	while (digits.length <= precision) {
		digits.unshift('0');
	}

	if (precision > 0) {
		digits.splice(digits.length - precision, 0, '.');
	}

	digits = Number(digits.join(''))
		.toFixed(precision)
		.split('');
	var raw = Number(digits.join(''));

	var decimalpos = digits.length - precision - 1;
	if (precision > 0) {
		digits[decimalpos] = decimalSeparator;
	} else {
		decimalpos = digits.length;
	}

	for (var x = decimalpos - 3; x > 0; x = x - 3) {
		digits.splice(x, 0, thousandSeparator);
	}

	if (prefix.length > 0) {
		digits.unshift(prefix);
	}
	if (suffix.length > 0) {
		digits.push(suffix);
	}

	if (allowNegative && numberIsNegative) {
		digits.unshift('-');
		raw = -raw;
	}

	return `R$ ${digits.join('').trim()}`;
}

export function maskCnpj(value) {
	if (!value) return '';

	value = value.replace(/\D/g, '');
	if (value.length > 14) value = value.substr(0, 14);
	return formataCampo('00.000.000/0000-00', value);
}

export function maskPostalCode(value) {
	if (!value) return '';

	value = value.replace(/\D/g, '');
	if (value.length > 8) value = value.substr(0, 8);
	return formataCampo('00000-000', value);
}

export function maskRG(value) {
	if (!value) return '';

	value = value.replace(/\D/g, '');
	if (value.length > 9) value = value.substr(0, 9);
	return formataCampo('00.000.000-0', value);
}

export function maskSiopi(value) {
	if (!value) return '';

	//value = value.replace(/\D/g, "");
	//if (value.length > 9) value = value.substr(0, 9);
	return formataCampo('0.0000.0000000-0', value);
}

export function maskNumber(value) {
	if (!value) return '';

	value = value.replace(/\D/g, '');
	return value;
}

export function maskNumberWithDot(value) {
	if (!value) return '';

	value = value.replace(/[^0-9.]/g, '');
	return value;
}

export function maskNumberAndHifen(value) {
	if (!value) return '';

	value = value.replace(/[^0-9-]/g, '');
	return value;
}

export function maskCharacterWithoutHifen(value) {
	if (!value) return '';

	value = value.replace(/[^a-zA-Z ]/g, '');
	return value;
}

export function maskCharacter(value) {
	if (!value) return '';

	value = value.replace(/[^a-zA-Z- ]/g, '');
	return value;
}

export function maskAlpha(value) {
	if (!value) return '';

	value = value.replace(/[^0-9a-zA-Z ]/g, '');
	return value;
}

function formatfield(mask, value) {
	if (!value) return '';

	var boolmask;

	var exp = /\-|\.|\/|\(|\)| /g;
	var onlynumbers = value.replace(exp, '');

	var fieldposition = 0;
	var newvaluefield = '';
	var masklengh = onlynumbers.length;

	for (var i = 0; i <= masklengh; i++) {
		boolmask =
			mask.charAt(i) === '-' ||
			mask.charAt(i) === '.' ||
			mask.charAt(i) === '/';
		boolmask =
			boolmask ||
			mask.charAt(i) === '(' ||
			mask.charAt(i) === ')' ||
			mask.charAt(i) === ' ';
		if (boolmask) {
			newvaluefield += mask.charAt(i);
			masklengh++;
		} else {
			newvaluefield += onlynumbers.charAt(fieldposition);
			fieldposition++;
		}
	}
	return newvaluefield;
}