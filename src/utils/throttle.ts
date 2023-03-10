export const throttle = (cb: (args: any) => any, interval: number = 250) => {
    let lastCall: number

    return (args: any) => {
        const now: number = Number(new Date())
        if(lastCall && now - lastCall < interval) return

        cb(args)
        lastCall = now
    }
}
