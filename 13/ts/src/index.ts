// task 1
export function task1(lines:string[], earlDepTime:number) {
    var myDepTime = 0
    var myLine = 0
    lines
    .filter(line => line != 'x')
    .map(line => parseInt(line))
    .forEach(line => {
        // quite clumsy solution
        var depLine = 0
        for (; earlDepTime > (depLine + line) ; depLine = depLine + line) {}
        if (myDepTime == 0 || myDepTime > (depLine + line)) {
            myLine = line
            myDepTime = depLine + line
        }
    })
    return myLine * (myDepTime - earlDepTime)
}
// console.log(`solution (task 1) = ${task1("41,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,37,x,x,x,x,x,541,x,x,x,x,x,x,x,23,x,x,x,x,13,x,x,x,17,x,x,x,x,x,x,x,x,x,x,x,29,x,983,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,19".split(","), 1000303)}`)

// task 2
export function task2(linesStr:string[], offset:number) {

    var lines:Map<number, number> = new Map()
    
    var maxLine = 0
    var maxIdx = 0

    var minLine = 0
    var minIdx = 0

    for (var i = 0; i < linesStr.length; i ++) {
        if (linesStr[i] != 'x') {
            var line = parseInt(linesStr[i])
            if (maxLine < line) {
                maxLine = line
                maxIdx = i
            }
            if (minLine == 0 || minLine > line) {
                minLine = line
                minIdx = i
            }
            lines.set(i, line)
        }
    }
    
    var match = false

    var t = offset 

    while(t % maxLine != 0) {
        t = t + 1
    }

    // var match = false
    // while (!match) {
    //     itCnt ++
        

        
    //     match = true
    //     for (var i = 0; i < lines.length; i ++) {
    //         if (lines[i] > 0) {
    //             if (!((t + i) % lines[i] == 0)) {
    //                 match = false
    //                 break
    //             }
    //         }
    //     }
    //     if (match == true) {
    //         break
    //     }
    //     t = t + maxLine - lines[0]
    // }
    // console.log(`${itCnt} iterations`)
    // return t
}
// console.log(`solution (task2) = ${task2("41,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,37,x,x,x,x,x,541,x,x,x,x,x,x,x,23,x,x,x,x,13,x,x,x,17,x,x,x,x,x,x,x,x,x,x,x,29,x,983,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,19".split(","), 100000000000000)}`)
