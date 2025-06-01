# Keyboard Date Input

EN / [JA](./README.ja.md)

## Overview
`keyboard-date-input` is a React component library that enables users to input dates and months efficiently using the keyboard. It helps prevent format errors and streamlines date entry.

- **Supported formats:**
  - Dates: `YYYY/MM/DD`
  - Months: `YYYY/MM`
  - Years: 1000–9999 only

## Installation
```bash
npm install keyboard-date-input
```

## Quick Start

### Preset Components
Import and use the provided input components:
```javascript
import { DateInput, MonthInput } from 'keyboard-date-input';
```
Example usage:
```jsx
<DateInput
  value={dateValue}
  onChange={setDateValue}
  className="date-input"
/>
```

You can use these components with form libraries like react-hook-form:
```jsx
const { register } = useForm();
// ...
return (
  <form>
    <DateInput {...register('date')} className="date-input" />
  </form>
);
```

### Custom Input Components
Wrap your own input component to add date input features:
```javascript
import { withDateInputFeature } from 'keyboard-date-input';
```
Decorate your component:
```jsx
const DecoratedInput = withDateInputFeature(YourInputComponent);
```
Use it as a controlled input:
```jsx
<DecoratedInput value={dateValue} onChange={handleChange} />
```

## API Reference
- **DateInput**: React component for date input (`YYYY/MM/DD`). Accepts all standard `<input>` props.
- **MonthInput**: React component for month input (`YYYY/MM`). Accepts all standard `<input>` props.
- **withDateInputFeature(Component)**: Higher-order component to add date input features to a custom input. The wrapped component should accept standard `<input>` props.
- **withMonthInputFeature(Component)**: Higher-order component to add month input features to a custom input. The wrapped component should accept standard `<input>` props.

## Features & Behavior

### General
- Only numeric input is accepted; non-numeric characters are ignored.
- Two modes: **Initial Input Mode** and **Edit Mode**.

### Initial Input Mode
- Input automatically advances (year -> month -> day) as numbers are entered.
- Slashes (`/`) are inserted automatically.
- Steps: Year -> Month -> Day.

#### Year
- 4-digit year required. Advances to month after 4 digits.
- **Backspace:** Deletes one character at a time.
- **Arrow keys:**
  - Ignored.

#### Month
- First digit:
  - `0`: Ignored.
  - `3-9`: Zero-padded, advances to day.
  - `1`: Waits for second digit.
- Second digit:
  - `3-9`: Treated as day input.
  - `0-2`: Finalizes month, advances to day.
- **Backspace:** Deletes one digit at a time; returns to year if first digit is deleted.
- **Arrow keys:**
  - Left: Moves to year.
  - Right: Moves to day (if entered).

#### Day
- First digit:
  - `0`: Ignored.
  - `1-9`: Zero-padded.
- Second digit:
  - Combined with first; ignored if exceeds max days in month.
- **Backspace:** Resets day to `00`.
- **Arrow keys:**
  - Left: Moves to month.

### Edit Mode
- Enabled when input is complete (`yyyy/mm/dd`).

#### Year Edit
- Cursor at year. Input shifts digits left.
- **Backspace:** Resets year to `0000`.
- **Right arrow:** Moves to month.

#### Month Edit
- Cursor at month. Input rules:
  - `0`: If month is `01`, becomes `10`.
  - `1`: If `01` or `11`, becomes `11`; else `01`.
  - `2`: If `01` or `11`, becomes `12`; else `02`.
  - `3-9`: Zero-padded as new month.
- **Backspace:** Resets month to `00`.
- **Left/Right arrows:** Move to year/day.

#### Day Edit
- Cursor at day. Input is combined with first digit and checked against max days.
- **Backspace:** Resets day to `00`.

## License
MIT License