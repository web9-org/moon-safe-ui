import { BigNumberish, type BigNumber } from 'ethers'
import { formatUnits, parseUnits } from 'ethers/lib/utils'
import { formatAmount } from './formatNumber'

const GWEI = 'gwei'

/**
 * Converts value to raw, specified decimal precision
 * @param value value in unspecified unit
 * @param decimals decimals of the specified value or unit name
 * @returns value at specified decimals, i.e. 0.000000000000000001
 */
export const safeFormatUnits = (value: BigNumberish, decimals: number | string = GWEI): string => {
  try {
    const formattedAmount = formatUnits(value, decimals)

    // FIXME: Temporary fix as ethers' `formatFixed` doesn't strip trailing 0s
    // for very high/low amounts, we can't `parseFloat` as it returns exponentials

    let [integer, fractions] = formattedAmount.split('.')

    if (!fractions) {
      return formattedAmount
    }

    while (fractions[fractions.length - 1] === '0') {
      fractions = fractions.substring(0, fractions.length - 1)
    }

    return fractions ? `${integer}.${fractions}` : integer
  } catch (err) {
    console.error('Error formatting units', err)
    return ''
  }
}

/**
 * Converts value to formatted (https://github.com/5afe/safe/wiki/How-to-format-amounts), specified decimal precision
 * @param value value in unspecified unit
 * @param decimals decimals of the specified value or unit name
 * @returns value at specified decimals, formatted, i.e. -< 0.00001
 */
export const formatVisualAmount = (value: BigNumberish, decimals: number | string = GWEI): string => {
  return formatAmount(safeFormatUnits(value, decimals))
}

export const safeParseUnits = (value: string, decimals: number | string = GWEI): BigNumber | undefined => {
  try {
    return parseUnits(value, decimals)
  } catch (err) {
    console.error('Error parsing units', err)
    return
  }
}

export const shortenAddress = (address: string, length = 4): string => {
  return `${address.slice(0, length + 2)}...${address.slice(-length)}`
}

export const shortenText = (text: string, length = 10, separator = '...'): string => {
  return `${text.slice(0, length)}${separator}`
}

export const dateString = (date: number) => {
  const formatterOptions: Intl.DateTimeFormatOptions = {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }
  return new Intl.DateTimeFormat(undefined, formatterOptions).format(new Date(date))
}

export const camelCaseToSpaces = (str: string): string => {
  return str
    .replace(/([A-Z][a-z0-9]+)/g, ' $1 ')
    .replace(/\s{2}/g, ' ')
    .trim()
}

export const ellipsis = (str: string, length: number): string => {
  return str.length > length ? `${str.slice(0, length)}...` : str
}
