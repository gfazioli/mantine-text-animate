# Mantine TextAnimate Component

<div align="center">
  
  ![Mantine TextAnimate Component](https://github.com/gfazioli/mantine-text-animate/assets/432181/cf1917a3-e7eb-4ecb-a525-85ff933c601d)

</div>

---

<div align="center">

  [![NPM version](https://img.shields.io/npm/v/%40gfazioli%2Fmantine-text-animate?style=for-the-badge)](https://www.npmjs.com/package/@gfazioli/mantine-text-animate)
  [![NPM Downloads](https://img.shields.io/npm/dm/%40gfazioli%2Fmantine-text-animate?style=for-the-badge)](https://www.npmjs.com/package/@gfazioli/mantine-text-animate)
  [![NPM Downloads](https://img.shields.io/npm/dy/%40gfazioli%2Fmantine-text-animate?style=for-the-badge&label=%20&color=f90)](https://www.npmjs.com/package/@gfazioli/mantine-text-animate)
  ![NPM License](https://img.shields.io/npm/l/%40gfazioli%2Fmantine-text-animate?style=for-the-badge)

</div>

## Overview

This component is created on top of the [Mantine](https://mantine.dev/) library.

[![Mantine UI Library](https://img.shields.io/badge/-MANTINE_UI_LIBRARY-blue?style=for-the-badge&labelColor=black&logo=mantine
)](https://mantine.dev/)

The `TextAnimate` component allows you to animate text with various effects.
Additionally, it provides other sub components such as `TextAnimate.TextTicker`, `TextAnimate.Typewriter`, `TextAnimate.NumberTicker`, and `TextAnimate.Spinner`.
You can also use three useful hooks: `useTextTicker`, `useTypewriter`, and `useNumberTicker`.

[![Video](https://img.shields.io/badge/-Watch_the_Video-blue?style=for-the-badge&labelColor=black&logo=youtube
)](https://youtu.be/RzRUb3IDcDw)
[![Demo and Documentation](https://img.shields.io/badge/-Demo_%26_Documentation-blue?style=for-the-badge&labelColor=black&logo=typescript
)](https://gfazioli.github.io/mantine-text-animate/)
[![Mantine Extensions HUB](https://img.shields.io/badge/-Mantine_Extensions_Hub-blue?style=for-the-badge&labelColor=blue
)](https://mantine-extensions.vercel.app/)

👉 You can find more components on the [Mantine Extensions Hub](https://mantine-extensions.vercel.app/) library.


## Installation

```sh
npm install @gfazioli/mantine-text-animate
```
or 

```sh
yarn add @gfazioli/mantine-text-animate
```

After installation import package styles at the root of your application:

```tsx
import '@gfazioli/mantine-text-animate/styles.css';
```

## Usage

```tsx
import { TextAnimate } from '@gfazioli/mantine-text-animate';

function Demo() {
  return (
<TextAnimate animate="in" animation="slideUp" by="character">
      Mantine TextAnimate component
    </TextAnimate>
  );
}
```

### TextAnimate.Typewriter

```tsx
import { TextAnimate } from '@gfazioli/mantine-text-animate';

function Demo() {
  return (
    <TextAnimate.Typewriter value="Hello, World! Mantine Typewriter component" animate />
  );
}
```

#### useTypewriter

```tsx
import { useTypewriter } from '@gfazioli/mantine-text-animate'

function Demo() {
    const { text, start, stop, reset, isTyping } = useTypewriter({
    value: ['Hello', 'From', 'Mantine useTypewriter() hook'],
  });

  return (
    <div>{text}</div>
  );
}
```

### TextAnimate.Spinner

```tsx
import { TextAnimate } from '@gfazioli/mantine-text-animate';

function Demo() {
  return (
    <TextAnimate.Spinner>★ SPINNING TEXT EXAMPLE ★</TextAnimate.Spinner>
  );
}
```

### TextAnimate.NumberTicker


```tsx
import { TextAnimate } from '@gfazioli/mantine-text-animate';

function Demo() {
  return (
    <TextAnimate.NumberTicker value={100} animate />
  );
}
```

#### useNumberTicker

```tsx
import { useNumberTicker } from '@gfazioli/mantine-text-animate'

function Demo() {
  const { text, isAnimating, start, stop, reset, displayValue } = useNumberTicker({
    value: 64,
    startValue: 0,
    delay: 0,
    decimalPlaces: 0,
    speed: 0.2,
    easing: 'ease-out',
    animate: true,
  });

  return (
    <div>{text}</div>
  );
}
```

### TextAnimate.TextTicker


```tsx
import { TextAnimate } from '@gfazioli/mantine-text-animate';

function Demo() {
  return (
    <TextAnimate.TextTicker value="Hello, World! Mantine TextTicker component" animate />
  );
}
```

#### useNumberTicker

```tsx
import { useTextTicker } from '@gfazioli/mantine-text-animate'

function Demo() {
  const { text, isAnimating, start, stop, reset } = useTextTicker({
    value: 'Mantine useTextTicker',
    delay: 0,
    speed: 0.2,
    easing: 'ease-out',
    animate: true,
  });

  return (
    <div>{text}</div>
  );
}
```
