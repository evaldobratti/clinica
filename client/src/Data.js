export default {
  user: {
    name: 'Valdo',
    i: 1
  },
  change () {
    console.log(this.user.i)
    this.user.i += 1
  }
}
