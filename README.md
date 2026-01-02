# Mantine Text Animate Component

<img width="2752" height="1536" alt="Mantine Text Animate" src="https://github.com/user-attachments/assets/5577a5d9-8d7f-402b-93fb-21592c19ce35" />

<div align="center">

  [![NPM version](https://img.shields.io/npm/v/%40gfazioli%2Fmantine-text-animate?style=for-the-badge)](https://www.npmjs.com/package/@gfazioli/mantine-text-animate)
  [![NPM Downloads](https://img.shields.io/npm/dm/%40gfazioli%2Fmantine-text-animate?style=for-the-badge)](https://www.npmjs.com/package/@gfazioli/mantine-text-animate)
  [![NPM Downloads](https://img.shields.io/npm/dy/%40gfazioli%2Fmantine-text-animate?style=for-the-badge&label=%20&color=f90)](https://www.npmjs.com/package/@gfazioli/mantine-text-animate)
  ![NPM License](https://img.shields.io/npm/l/%40gfazioli%2Fmantine-text-animate?style=for-the-badge)

---

[<kbd> <br/> ❤️ If this component has been useful to you or your team, please consider becoming a sponsor <br/> </kbd>](https://github.com/sponsors/gfazioli?o=esc)  

</div>

## Overview

This component is created on top of the [Mantine](https://mantine.dev/) library.

[Mantine TextAnimate](https://gfazioli.github.io/mantine-text-animate/) is a comprehensive animation toolkit for text in React, designed to integrate seamlessly with Mantine UI. At its core, the TextAnimate component lets you choose entry/exit/static states and apply animations such as slide, scale, and blur, while controlling granularity with the by prop (character, word, line) and timing through duration, delay, and segmentDelay. Fine‑tuning is enabled via animateProps—translateDistance, scaleAmount, and blurAmount—so you can tailor motion intensity per effect. Event handlers like onAnimationStart and onAnimationEnd make it straightforward to react to animation lifecycles.

Beyond basic text transitions, the package offers higher‑level primitives for common patterns: TextAnimate.Typewriter and the useTypewriter hook provide cursor and blink options, speed/delay controls, loop behavior, multiline rendering, and hooks to start/stop/reset typing, plus onTypeEnd and onTypeLoop callbacks. 

For data presentations, useNumberTicker animates numeric values with speed, easing, and completion callbacks, while useTextTicker reveals target strings from random characters with configurable character sets, reveal direction, and lifecycle control. Styling is fully compatible with Mantine props, and global styles can be imported directly or within a CSS layer, making the system flexible for documentation sites, dashboards, and rich UI interactions.

> [!note]
>
> → [Demo and Documentation](https://gfazioli.github.io/mantine-text-animate/) → [Youtube Video](https://www.youtube.com/playlist?list=PL85tTROKkZrWyqCcmNCdWajpx05-cTal4) → [More Mantine Components](https://mantine-extensions.vercel.app/)

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
## Sponsor

<div align="center">

[<kbd> <br/> ❤️ If this component has been useful to you or your team, please consider becoming a sponsor <br/> </kbd>](https://github.com/sponsors/gfazioli?o=esc)

</div>

Your support helps me:

- Keep the project actively maintained with timely bug fixes and security updates 	
- Add new features, improve performance, and refine the developer experience 	
- Expand test coverage and documentation for smoother adoption 	
- Ensure long‑term sustainability without relying on ad hoc free time 	
- Prioritize community requests and roadmap items that matter most

Open source thrives when those who benefit can give back—even a small monthly contribution makes a real difference. Sponsorships help cover maintenance time, infrastructure, and the countless invisible tasks that keep a project healthy.

Your help truly matters.

💚 [Become a sponsor](https://github.com/sponsors/gfazioli?o=esc) today and help me keep this project reliable, up‑to‑date, and growing for everyone.

---
https://github.com/user-attachments/assets/8bbeb7ef-9e1f-46ab-a105-cdd1e0040780

---  
[![Star History Chart](https://api.star-history.com/svg?repos=gfazioli/mantine-text-animate&type=Timeline)](https://www.star-history.com/#gfazioli/mantine-text-animate&Timeline)
