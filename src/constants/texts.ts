export const TEXTS = {
	'Advanced tactics': [
		{
			title: 'Can I/should I Surrender?',
			text: `If you’re playing at a casino that offers surrender (also known as late surrender or LS), you will only have the option to surrender on the first two cards you’re dealt. You won’t be able to surrender if you’ve already taken a hit card. 
			This is why surrender is the first thing you have to think about when playing your hand. If the answer is NO you can’t or NO you shouldn’t surrender, you then ask yourself… 
			Surrenders: 
			16 surrenders against dealer 9 through Ace, otherwise don’t surrender (revert to hard totals) 
			15 surrenders against dealer 10, otherwise don’t surrender (revert to hard totals).`,
		},
		{
			title: 'Can I/Should I Split?',
			text: `The second most important decision is whether or not to split. This will only be an option when your first two cards are a pair or if you have two ten-valued cards (like a jack and a king). 
			If the answer is NO you can’t or you shouldn’t split, you ask yourself…
			Splits: 
			Always split aces.<br/> Never split tens.
			A pair of 9’s splits against dealer 2 through 9, except for 7, otherwise stand.
			Always split 8’s
			A pair of 7’s splits against dealer 2 through 7, otherwise hit.
			A pair of 6’s splits against dealer 2 through 6, otherwise hit.
			A pair of 5’s doubles against dealer 2 through 9, otherwise hit.
			A pair of 4’s splits against dealer 5 and 6, otherwise hit.
			A pair of 3’s splits against dealer 2 through 7, otherwise hit.
			A pair of 2’s splits against dealer 2 through 7, otherwise hit.`,
		},
		{
			title: 'Can I/Should I Double?',
			text: `When basic strategy calls for doubling, it’s a really good thing! It means you’re likely to win the hand! Some casinos restrict doubling on certain hands so it may not always be possible, but you want to make sure you’ve ruled it out before you move on...
			Soft totals:
			A soft total is any hand that has an Ace as one of the first two cards, the ace counts as 11 to start.
			Soft 20 (A,9) always stands.
			Soft 19 (A,8) doubles against dealer 6, otherwise stand.
			Soft 18 (A,7) doubles against dealer 2 through 6, and hits against 9 through Ace, otherwise stand.
			Soft 17 (A,6) doubles against dealer 3 through 6, otherwise hit.
			Soft 16 (A,5) doubles against dealer 4 through 6, otherwise hit.
			Soft 15 (A,4) doubles against dealer 4 through 6, otherwise hit.
			Soft 14 (A,3) doubles against dealer 5 through 6, otherwise hit.
			Soft 13 (A,2) doubles against dealer 5 through 6, otherwise hit.`,
		},
		{
			title: 'Should I hit or should I stand?',
			text: `The last thing you should think about when it comes to basic strategy is whether or not to take another card. If the other options above are not appropriate for your hand then you would choose to hit or stand.
			Hard totals:
			A hard total is any hand that does not start with an ace in it, or it has been dealt an ace that can only be counted as 1 instead of 11.
			17 and up always stands.
			16 stands against dealer 2 through 6, otherwise hit.
			15 stands against dealer 2 through 6, otherwise hit.
			14 stands against dealer 2 through 6, otherwise hit.
			13 stands against dealer 2 through 6, otherwise hit.
			12 stands against dealer 4 through 6, otherwise hit.
			11 always doubles.
			10 doubles against dealer 2 through 9 otherwise hit.
			9 doubles against dealer 3 through 6 otherwise hit.
			8 always hits.`,
		},
	],
	'Basic strategy': [
		{
			title: 'Understanding house edge',
			text: `In Blackjack, the casino’s advantage (the house edge) is typically around 0.8%, but this can vary depending on the rules and the number of decks used. For example, a single-deck game might have a house edge as low as 0.18%, while a game with unfavorable rules (like a 6:5 payout on Blackjack and the dealer hitting on soft 17) will have a higher edge. 
			One of the first steps in developing a Blackjack strategy is understanding how these rule variations impact your chances of winning. Before you even place a bet, take note of the table rules, especially whether the dealer hits or stands on a soft 17 (a 17 that includes an Ace). If the dealer hits on soft 17, the house edge increases by about 0.2%.`,
		},
		{
			title: 'Using house edge to your advantage',
			text: `Even though the house has an edge, understanding it empowers you to make smarter decisions. Here’s how: 
			Choose favorable tables: Look for games with a lower house edge. Fewer decks, favorable rules (dealer stands on soft 17), and higher Blackjack payouts all work in your favor.
			Master basic strategy: 
			By following a basic strategy chart, you make statistically optimal decisions, minimizing the house edge’s impact.
			Manage your bankroll:
			The “Odds” section on the table is there for a reason. Use it to understand the probabilities and bet responsibly. Don’t be afraid to walk away from a table if you’re on a losing streak or your bankroll is getting low.
			Even with the best strategy, Blackjack is still a game of chance. 
			You won’t win every hand, but by understanding the house edge and making informed decisions, you can increase your chances of walking away a winner in the long run.`,
		},
		{
			title: 'Using a Blackjack strategy chart',
			text: `Strategy charts are the best way to learn basic blackjack strategy as they list every possible combination of dealer and player hands. Because casinos only shuffle after every game, the game is predictable when you’ve played enough.
			It would be best to use a basic blackjack strategy chart until you feel that you’ve memorized all possible combinations in a game. Once this happens, players can switch to testing their skills at recalling playing habits or using a table instead of a chart.`,
		},
	],
	'Card counting': [
		{
			title: 'Counting cards can be broken into 4 steps:',
			text: `Step 1. Assign a value to every card
			Step 2. Keep a “Running Count” based off of the values of the card dealt 
			Step 3. Use this information to calculate the count per deck or “true count”
			Step 4. Change your bets as the true count rises`,
		},
	],
	'Bankroll management': [
		{
			title: `The easy answer:
			Number of Betting Units`,
			text: `Now that that’s out of the way, let me quickly show how the number of units will affect your risk, because that’s probably what people are wondering… how many units do I need to not go broke?
			Assuming PERFECT BLACKJACK PLAY, standard rules and a 1-12 bet spread (better rules or pen would have lower risk, worse rules or pen would have higher risk): <br/> 200 Units: ~40% Risk of Ruin.
			That means that 4/10 card counters who play this way will be kissing their bankroll goodbye. The other 6/10 card counters will hit some positive variance and never look back. I wouldn’t recommend playing at this level of risk for long. 
			But if you decide you can handle those odds and don’t have another option, then may the cards fall in your favor.
			400 Units: ~20% Risk of Ruin.
			For any of us who’ve played blackjack professionally, you would never want to run at this level for long, as you wouldn’t want to wipe out your capital once out of every 5 bankrolls. But I know Ben and I started higher than this. So again, you can decide if 20% is appropriate relative to your other options. 
			500 Units: ~10% Risk of Ruin.
			Still high for long-term, but 9/10 card counters will be okay if they started with 500 units (of course, once you’ve been winning, you wouldn’t keep re-sizing your bets to stay at 10% risk… it’s assuming you start at that level and keep playing the same stakes as your units increase).
			1000 Units: ~1% Risk of Ruin. 
			Once we were living off of blackjack, I preferred 1% or lower. With $2k, I had little to lose. But when card counting was a full-time job making me well over $100/hr I didn’t want to go back to waiting tables!`,
		},
	],
}
