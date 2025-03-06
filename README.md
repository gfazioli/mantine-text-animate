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

It allows for easy management of two separate views, such as in the cases of a registration form and a login form.
Essentially, when switching between views, the component will handle the flip animation.


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
    <TextAnimate h={200} w={200}>

        <Paper radius="md" withBorder p="lg" shadow="md">
          <h3>Front Card</h3>
          <TextAnimate.Typewriter>
            <Button>TextAnimate Back</Button>
          </TextAnimate.Typewriter>
        </Paper>

        <Paper radius="md" withBorder p="lg" shadow="md">
          <h3>Back Card</h3>
          <TextAnimate.Typewriter>
            <Button>TextAnimate Front</Button>
          </TextAnimate.Typewriter>
        </Paper>

    </TextAnimate>
  );
}
```

As you can see, the `TextAnimate` component wraps two children, which are the two views that you want to flip between.
The `TextAnimate.Typewriter` component is used to define the trigger for the flip animation. It can be any component, such as a button, or a link, or even a div.

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| perspective | string | 1000px | The perspective property defines how far the object is away from the user. |
| duration | number | .8 | The duration in seconds of the flip animation. |
| easing | string | ease-in-out | The easing function to be used for the flip animation. |
| flipped | boolean | false | The initial state of the controlled TextAnimate component. |
| defaultTextAnimateped | boolean | false | The default state of the uncontrolled flip component. |
| direction | 'horizontal' or 'vertical' | 'horizontal' | The direction of the flip animation. |
| directionTextAnimateIn | 'negative' or 'positive' | 'negative' | The direction of the flip animation when flipping in. |
| directionTextAnimateOut | 'negative' or 'positive' | 'positive' | The direction of the flip animation when flipping out. |
| onChange | (flipped: boolean) => void | - | Callback to be called when the flip state changes. |
| onBack | () => void | - | Callback to be called when the flip state changes to false. |
| onFront | () => void | - | Callback to be called when the flip state changes to true. |

