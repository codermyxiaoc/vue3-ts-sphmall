import gsap from 'gsap'
export default function() {
  const EnterFrom = (el: Element) => {
    // console.log('EnterFrom', el) // el 当前 transition 包裹的标签
    gsap.set(el, {
      width: 0,
      height: 0,
      opacity: 0,
    })
  }
  const EnterActive = (el: Element, done: gsap.Callback) => {
    gsap.to(el, {
      width: 210,
      height: 460,
      onComplete: done,
      opacity: 1,
    })
  }
  const leaveActive = (el: Element, done: gsap.Callback) => {
    gsap.to(el, {
      width: 0,
      height: 0,
      opacity: 0,
      onComplete: done,
    })
  }
  return{
    EnterFrom,
    EnterActive,
    leaveActive
  }
} 