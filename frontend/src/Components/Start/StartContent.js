import { Fragment } from 'react';

import classes from './Start.module.css';

const StartContent = () => {
	return (
		<Fragment>
			<p className={`${classes['first']} ${classes['animation-up']}`}>
				<span className='bold-text'>Remember Task</span> to nazwa, która jako
				pierwsze wpadła mi do głowy <br />
				podczas tworzenia mockup'u tego projektu
			</p>

			<div
				className={`${classes['more-p']} ${classes.second} ${classes['animation-up']}`}>
				<p>
					Za pomocą prostego edytora, będziesz mógł zapisać na później co tylko
					chcesz!
				</p>
				<p className={classes['funny-text']}>
					Znaczy no, dałem ograniczenia na litery, p2w LOL
				</p>
			</div>
			<div className={classes['more-p']}>
				<p className={`${classes.third} ${classes['animation-up']}`}>
					Dobra już koniec rozpisywania się, przekonaj się sam...
				</p>
				<p className={`${classes['next-info']} ${classes.fourth}`}>
					Kliknij byle co lub jak zawsze "Spacje", aby kontynować
				</p>
			</div>
		</Fragment>
	);
};

export default StartContent;
