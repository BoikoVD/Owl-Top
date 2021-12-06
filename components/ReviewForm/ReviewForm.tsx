import { ReviewFormProps } from './ReviewForm.props';
import cn from 'classnames';
import styles from './ReviewForm.module.css';
import { Button, Input, Rating, Textarea } from '..';
import CloseIcon from './close.svg';
import { useForm, Controller } from 'react-hook-form';
import { IReviewForm, IReviewSendResponse } from './reviewForm.interface';
import axios from 'axios';
import { api } from '../../helpers/api';
import { useState } from 'react';

export const ReviewForm = ({ productId, isOpened, className, ...props }: ReviewFormProps): JSX.Element => {
	const { register, control, handleSubmit, formState: { errors }, reset, clearErrors } = useForm<IReviewForm>();
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const [error, setError] = useState<string>();

	const onSubmit = async (formData: IReviewForm) => {
		try {
			const { data } = await axios.post<IReviewSendResponse>(api.review.createDemo, { ...formData, productId });
			if (data.message) {
				setIsSuccess(true);
				reset();
			} else {
				setError('Что-то пошло не так');
			}
		} catch (e) {
			if (e instanceof Error) {
				setError(e.message);
			}
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className={cn(styles.reviewForm, className)} {...props}>
				<Input
					{...register('name', { required: { value: true, message: 'Введите имя' } })}
					error={errors.name}
					placeholder='Имя'
					tabIndex={isOpened ? 0 : -1}
					aria-invalid={errors.name ? true : false}
				/>
				<Input
					{...register('title', { required: { value: true, message: 'Введите заголовок' } })}
					error={errors.title}
					className={styles.titleInput}
					placeholder='Заголовок отзыва'
					tabIndex={isOpened ? 0 : -1}
					aria-invalid={errors.title ? true : false}
				/>
				<div className={styles.rating}>
					<span>
						Оценка:
					</span>
					<Controller
						control={control}
						name={'rating'}
						rules={{ required: { value: true, message: 'Укажите оценку' } }}
						render={({ field }) => (
							<Rating isEditable={true} rating={field.value} setRating={field.onChange} error={errors.rating} ref={field.ref} tabIndex={isOpened ? 0 : -1} />
						)}
					/>
				</div>
				<Textarea
					{...register('description', { required: { value: true, message: 'Заполните текст' } })}
					error={errors.description}
					className={styles.textarea}
					placeholder='Текст отзыва'
					tabIndex={isOpened ? 0 : -1}
					aria-label='текст отзыва'
					aria-invalid={errors.description ? true : false}
				/>
				<div className={styles.submit}>
					<Button appearance='primary' tabIndex={isOpened ? 0 : -1} onClick={() => clearErrors()}>Отправить</Button>
					<span className={styles.submitInfo}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
				</div>
			</div>
			{isSuccess && <div className={cn(styles.success, styles.panel)} role='alert'>
				<div className={styles.successTitle}>Ваш отзыв отправлен</div>
				<div className={styles.successDescription}>Спасибо, ваш отзыв будет опубликован после проверки</div>
				<button onClick={() => setIsSuccess(false)} className={styles.close} aria-label='закрыть оповещение'>
					<CloseIcon />
				</button>
			</div>}
			{error && <div className={cn(styles.error, styles.panel)} role='alert'>
				Что-то пошло не так, попробуйте обновить страницу
				<button className={styles.close} onClick={() => setError(undefined)} aria-label='закрыть оповещение'>
					<CloseIcon />
				</button>
			</div>}
		</form>
	);
};