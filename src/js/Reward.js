const reward = {
    threeBar_thrice: 50,
    twobar_thrice: 20,
    singleBar_thrice: 10,
    seven_thrice: 150,
    singleBar: 5,
    cherry_sevenCombo: 75
};
function cherryReward(line) {
    const rewardCheeriesAtLine = {
        1: 2000,
        2: 1000,
        3: 4000
    }
    return rewardCheeriesAtLine[line];
}

export default class Reward {
    constructor(data, line) {
        this.data = data;
        this.line = line;
    }

    rewardCalculation() {
        // ['3xBAR', 'BAR', '2xBAR', '7', 'Cherry']
        // [7,3bar , bar, 2bar, cherry]
        if (this.data[4] === 3)
            return cherryReward(this.line);
        if (this.data[3] === 3)
            return reward.twobar_thrice;
        if (this.data[2] === 3)
            return reward.singleBar_thrice;
        if (this.data[1] === 3)
            return reward.threeBar_thrice;
        if (this.data[0] === 3)
            return reward.seven_thrice;

        if (this.data[4] > 0 && this.data[4] < 3) {

            if (this.data[0] > 0 && this.data[0] < 3) {

                if (this.data[2] === 1) {
                    return reward.cherry_sevenCombo + reward.singleBar;
                }
                return reward.cherry_sevenCombo;
            }

        }
        if (this.data[2] > 0 && this.data[2] < 3)
            return reward.singleBar;

        return 0;
    }
    static highlight(line) {
        let elem = Array.from(reels.getElementsByClassName('icons'))
        // console.log(elem.map((s)=>s.childNodes.length))
        // const middleChild = elem.map((s)=>s.childNodes.length)[0]-2;
        // console.log(middleChild);
        switch (line) {
            case 1:
                elem.map((x) =>
                    x.childNodes[0].style.background = 'red')
                break;
            case 2:
                elem.map((x) =>
                    x.childNodes[1].style.background = 'red')
                break;

            case 3:
                elem.map((x) =>
                    x.childNodes[2].style.background = 'red')
                break;
        }

    }
}
