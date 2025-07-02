# Mantine TextAnimate Component

  
https://github.com/user-attachments/assets/8bbeb7ef-9e1f-46ab-a105-cdd1e0040780


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

[![Mantine Extensions](https://img.shields.io/badge/-Watch_the_Video-blue?style=for-the-badge&labelColor=black&logo=youtube
)](https://www.youtube.com/playlist?list=PL85tTROKkZrWyqCcmNCdWajpx05-cTal4)
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

https://github.com/user-attachments/assets/a665af0a-7845-4946-99e1-1c5802e16d46


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

https://github.com/user-attachments/assets/53266b12-86a6-4b4d-8da4-ec9caa22aef4


```tsx
import { TextAnimate } from '@gfazioli/mantine-text-animate';

function Demo() {
  return (
    <TextAnimate.Spinner>★ SPINNING TEXT EXAMPLE ★</TextAnimate.Spinner>
  );
}
```

### TextAnimate.NumberTicker


https://github.com/user-attachments/assets/31e08c53-0d59-42a5-bc16-98baedda91cd



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


https://github.com/user-attachments/assets/eaa647a4-2523-4d33-8aec-b303c447ffbb



```tsx
import { TextAnimate } from '@gfazioli/mantine-text-animate';

function Demo() {
  return (
    <TextAnimate.TextTicker value="Hello, World! Mantine TextTicker component" animate />
  );
}
```

#### useTextTicker

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

<div align="center">
  
[![Star History Chart](https://api.star-history.com/svg?repos=gfazioli/mantine-text-animate&type=Timeline)](https://www.star-history.com/#gfazioli/mantine-text-animate&Timeline)

</div>
