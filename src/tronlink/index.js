/** 代币地址 */
const atAddress = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t';

var timer = null;
var pullCount = 1;
var maxPullCount = 5;

export async function getTronlinkAddress() {
    clearInterval(timer);
    return new Promise((resolve, reject) => {
        timer = setInterval(() => {
            pullCount += 1;
            if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
                clearInterval(timer);
                const defaultAddress = window.tronWeb.defaultAddress.base58;
                console.log('--------------');
                console.log(defaultAddress);
                console.log('--------------');
                localStorage.setItem('address', defaultAddress);
                resolve(defaultAddress)
            }
            if (pullCount >= maxPullCount) {
                clearInterval(timer);
                reject('自动登录失败,请先安装TronLink并登录');
            }
        }, 1000)
    })
}

// 充值
export async function transaction(amount, address) {

    console.log(address, amount);
    let contract = await window.tronWeb.contract().at(atAddress);
    // awaiting
    return contract.transfer(
        address,
        window.tronWeb.toHex(amount)
    ).send({
        feeLimit: 10000000
    })
}