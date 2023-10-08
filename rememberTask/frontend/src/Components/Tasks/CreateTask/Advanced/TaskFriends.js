import React, { Fragment, useContext, useState } from 'react';
import classes from './TaskFriends.module.css';
import GeneralContext from '../../../../Context/general-context';
import UserDataContext from '../../../../Context/userData-context';

const TaskFriends = (props) => {
	const geneCtx = useContext(GeneralContext);
	const userCtx = useContext(UserDataContext);

	const setAddFriend = () => {
		geneCtx.onChangeToOn();
	};

	const removeUserHandler = (id) => {
		userCtx.onRemoveFriend(id);
	};

	return (
		<Fragment>
			<div className={classes['task-friends']}>
				<h3>Znajomi</h3>
				<div className={classes.list}>
					<div onClick={setAddFriend} className={classes['friends-add']}>
						<p>Dodaj</p>
						<i className='fa-solid fa-user-plus'></i>
					</div>
					{userCtx.friendList.map((item) => (
						<div
							key={item.id}
							className={classes.friend}
							onClick={() => removeUserHandler(item.id)}>
							<p>{item.value}</p>
						</div>
					))}
				</div>
			</div>
		</Fragment>
	);
};

export default TaskFriends;
