function blackJack() {

    const defaultDeck = [2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10, 'J', 'J', 'J', 'J', 'Q', 'Q', 'Q', 'Q', 'K', 'K', 'K', 'K', 'A', 'A', 'A', 'A'];
    let hasBeenRun = 0;
    let deck = defaultDeck;
    let hand = [];
    let dealer = [];
    let stay = 0;
    let money = 0;
    let total = 0;

    function reset() {
        deck = defaultDeck;
        dealer = [];
        hand = [];
        stay = 0;
        hasBeenRun = 0;
        console.log('The round has ended!')
    }

    function sumTotal(arr) {
        let subtotal = sumWithNoAces(arr);
        return addAces(subtotal);
    }

    function sumWithNoAces(arr) {
        let sum = 0;
        let aces = 0;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === 'A') {
                aces++;
            } else {
                if (arr[i] === 'J' || arr[i] === 'Q' || arr[i] === 'K') {
                    sum += 10;
                } else {
                    sum += arr[i]
                }
            }
        }
        return [aces, sum]
    }

    function addAces([aces, sum]) {
        while (aces > 0) {
            if (sum + 11 > 21) {
                sum += 1;
            } else {
                sum += 11;
            }
            aces--
        }
        return sum;
    }

    const shuffleDeck = (array) => {
        return array.map(shuffle => [Math.random(), shuffle]).sort((a, b) => a[0] - b[0]).map((a) => a[1]);
    }


    const drawCards = (n, person) => {
        for (let i = 0; i < n; i++) {
            person.push(deck.pop())
        }
    }

    function sumTotal(arr) {
        let subtotal = sumWithNoAces(arr);
        return addAces(subtotal);
    }

    function sumWithNoAces(arr) {
        let sum = 0;
        let aces = 0;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === 'A') {
                aces++;
            } else {
                if (arr[i] === 'J' || arr[i] === 'Q' || arr[i] === 'K') {
                    sum += 10;
                } else {
                    sum += arr[i]
                }
            }
        }
        return [aces, sum]
    }

    function addAces([aces, sum]) {
        while (aces > 0) {
            if (sum + 11 > 21) {
                sum += 1;
            } else {
                sum += 11;
            }
            aces--
        }
        return sum;
    }

    const censor = (dealersHand) => {
        let censorDeal = [];
        censorDeal[0] = '*';
        for (let i = 1; i < dealersHand.length; i += 1) {
            censorDeal.push(dealersHand[i])
        }
        return censorDeal;
    }

    const checkBlackJack = (dealersHand, playersHand) => {

        if (dealersHand === 21 && playersHand === 21) return 3
        if (playersHand === 21) return 2
        if (dealersHand === 21) return 1
        return 0;
    }
    return function (action) {

        if (hasBeenRun === 0) {

            if (!isNaN(action)) {
                money = action;
            } else {
                return console.log('Bet some money you goof');
            }

            deck = shuffleDeck(deck);
            drawCards(2, hand);
            drawCards(2, dealer);
            money = action;
            hasBeenRun = 1;
            money = action;
        }

        if (action === 'hit') {
            drawCards(1, hand);
        }

        if (action === 'stay') {
            while (sumTotal(dealer) < 17) {
                drawCards(1, dealer)
            }
            stay = 1;
        }

        let checkStatus = checkBlackJack(sumTotal(dealer), sumTotal(hand));

        if (checkStatus === 3) {
            console.log('This is very unusual. That is a draw. Double BlackJack!');
            console.log('Your hand is :', hand, ' -  sum :', sumTotal(hand))
            console.log('Dealer is :', dealer, ' -  sum :', sumTotal(dealer))
            reset();
        } else if (checkStatus === 2) {
            console.log('Pure magic. You won BlackJack!!');
            console.log('Your hand is :', hand, ' -  sum :', sumTotal(hand))
            console.log('Dealer is :', dealer, ' -  sum :', sumTotal(dealer))
            total = money * 2;
            reset();
        } else {

            if (sumTotal(hand) > 21) {
                console.log('You lost - Boooooh!!');
                console.log('Your hand is :', hand, ' -  sum :', sumTotal(hand))
                console.log('Dealer is :', dealer, ' -  sum :', sumTotal(dealer))
                total = total - money;
                reset();

            } else if (sumTotal(dealer) > 21) {
                console.log('Wat, you won!')
                console.log('Your hand is :', hand, ' -  sum :', sumTotal(hand))
                console.log('Dealer is :', dealer, ' -  sum :', sumTotal(dealer))
                total = total - money;
                reset();
            } else if (stay === 1) {
                if (sumTotal(hand) === sumTotal(dealer)) {
                    console.log('Draw !!!');
                    console.log('Your hand is :', hand, ' -  sum :', sumTotal(hand))
                    console.log('Dealer is :', dealer, ' -  sum :', sumTotal(dealer))
                    reset();
                }
                if (sumTotal(hand) > sumTotal(dealer)) {
                    console.log('You won!')
                    console.log('Your hand is :', hand, ' -  sum :', sumTotal(hand))
                    console.log('Dealer is :', dealer, ' -  sum :', sumTotal(dealer))
                    total = total + money;
                    reset();
                }
                if (sumTotal(hand) < sumTotal(dealer)) {

                    console.log('You lost - oh no!');
                    console.log('Your hand is :', hand, ' -  sum :', sumTotal(hand))
                    console.log('Dealer is :', dealer, ' -  sum :', sumTotal(dealer))
                    total = total - money;
                    reset();

                }
            } else {
                console.log('Your hand is :', hand, ' -  sum :', sumTotal(hand))
                console.log('Dealer is :', censor(dealer), ' -  sum : ? ')
                console.log('Do you stay, hit, or reset?')
            }
        }
    }
}

//Initialize Game
const play = blackJack();


console.log('Welcome to Black Jack!');
console.log("Initialize the game by running play()")
