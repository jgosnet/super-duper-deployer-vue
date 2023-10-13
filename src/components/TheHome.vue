<template lang="pug">
v-container(fill-height).vertically-centered
  div.center
    div.centered
      h1 Deployment Tool
      i.small All your deployments made easy.
  div.footerNote
    b Registered under MIT license:
    | Copyright 2023 SDVI SA team
    br
    | Permission is hereby granted, free of charge, to any person obtaining a copy of
    | this software and associated documentation files (the 'Software'), to deal in
    | the Software without restriction, including without limitation the rights to use, copy,
    | modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
    |permit persons to whom the Software is furnished to do so, subject to the following conditions:
    br
    | The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
    br
    br
    | THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
    |INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE
    |AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
    |DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    |OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
</template>

<script>
export default {
  name: "TheHome"
}
</script>

<style scoped>
.center {
  line-height: 70vh;
  text-align: center;
  margin-bottom: 20vh;
}

.small{
  font-size: 28px;
}

.centered {

  line-height: 1.5;
  display: inline-block;
  vertical-align: middle;
}

h1{
  font-size: 72px
}


.footerNote {
  position: absolute;
  bottom: 0;
  width: 90%;
  padding-top: 10px;
  font-size: x-small;
  font-style: italic;
  text-align: left;
}
</style>