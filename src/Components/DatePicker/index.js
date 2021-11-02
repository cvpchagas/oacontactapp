import React, {useEffect, useState} from 'react';

import TextField from '@material-ui/core/TextField';

import {MuiPickersUtilsProvider} from '@material-ui/pickers';

import moment from 'moment';

import MomentUtils from '@date-io/date-fns';

import ptBR from "date-fns/locale/pt-BR";

import './styles.css'

const DatePickers = ({value, name, setDateValue, type, label, disabled, onKeyDown, forwardRef, tabIndex}) => {
	const [dateValue, changeDateValue] = useState(value);

	useEffect(() => {
		changeDateValue(value);
	}, [value]);
	
	const format = (number) => {
		if (number < 10) {
			return '0' + number
		}
		return number
	}

	const getFormattedExibitionDate = (date) => {
		if (date == null) return '';

		var month = format(date.month() + 1);

		var day = format(date.date());

		var year = format(date.year());

		return day + "/" + month + "/" + year;
	}

	const getFormattedAmericanDate = (date) => {
		if (date == null) return;

		var month = format(date.month() + 1);

		var day = format(date.date());

		var year = format(date.year());

		return year + "-" + month + "-" + day;
	}

	const getFilterFormatDate = (date) => {
		if (date == null) return;

		var month = format(date.month() + 1);

		var day = format(date.date());

		var year = format(date.year());

		return month + "/" + day + "/" + year;
	}

	const onChange = event => {
		const target = event.target;

		const value = target.value;

		changeDateValue(value);
	};

	const onBlur = () => {
		let formatedValue = null;

		if (moment(dateValue).isValid()) {
			formatedValue = moment(dateValue);
		}

		const DataWithFormats = {
			newDateFormat: formatedValue,
			brazilianFormat: getFormattedExibitionDate(formatedValue),
			americanFormat: getFormattedAmericanDate(formatedValue) || '',
			response: getFilterFormatDate(formatedValue),
			milliseconds: formatedValue ? formatedValue.toDate().getTime() : 0
		}

		DataWithFormats['name'] = name;

		setDateValue(DataWithFormats);
	}

	const getDateValue = () => {
		if (dateValue === null) return "";

		return moment(dateValue).format(type === 'date' ? 'Y-MM-DD' : 'Y-MM');
	}

	return (
		<MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale={ptBR}>
			<TextField
				label={label}
				value={getDateValue()}
				InputLabelProps={{ shrink: true }}
				inputProps={{ min: "2020-01-01" }}
				type={type}
				onChange={onChange}
				onBlur={onBlur}
				className="default-date-input"
				disabled={disabled}
				onKeyDown={onKeyDown}
				inputRef={forwardRef}
				tabIndex={tabIndex}
			/>
		</MuiPickersUtilsProvider>
	)
}

function isPropsEquals(previousProps, nextProps) {
	if (previousProps.value !== nextProps.value) return false;

	if (previousProps.disabled !== nextProps.disabled) return false;

	return true;
}

export default React.memo(DatePickers, isPropsEquals)