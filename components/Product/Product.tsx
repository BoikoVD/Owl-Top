import { ProductProps } from './Product.props';
import cn from 'classnames';
import styles from './Product.module.css';
import { Button, Card, Divider, Rating, Review, ReviewForm, Tag } from '..';
import { declOfNum, priceRu } from '../../helpers/helpers';
import Image from 'next/image';
import { useRef, useState } from 'react';

export const Product = ({ product, className, ...props }: ProductProps): JSX.Element => {
	const [isReviewOpened, setisReviewOpened] = useState<boolean>(false);
	const reviewRef = useRef<HTMLDivElement>(null);

	const scrollToReviews = () => {
		setisReviewOpened(true);
		reviewRef.current?.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		});
	};

	const rev1 = {
		_id: "1qwe",
		name: "Василий Раганов",
		title: "Что вас ждет в этом курсе?",
		description: "Напишу сразу в двух курсах, так как проходил оба. Java будет многим непросвещённым сложновата в изучении, но здесь перевес из-за лидирующего положения языка как самого популярного в программировании. Выбор мой пал на эту профессию еще и потому, что Java-разработчики получают самую большую зарплату. Хотя Python начинает догонять Java по многим моментам, но вот в крупном екоме разработке Джава все-таки остается главенствующей сейчас. Скажу так – полнота программы и интенсивность присуща обоим курсам GeekBrains. Хочу отметить, что с первого дня занятий вы приступаете к практике и получаете опыт коммерческой разработки уже в свое резюме. Скажу вам как прошедший это – реально помогло в трудоустройстве!",
		createdAt: new Date(),
		rating: 4
	};
	const rev2 = {
		_id: "2qwe",
		name: "Boiko Volodymyr",
		title: "Что вас ждет в этом курсе?",
		description: "Напишу сразу в двух курсах, так как проходил оба. Java будет многим непросвещённым сложновата в изучении, но здесь перевес из-за лидирующего положения языка как самого популярного в программировании. Выбор мой пал на эту профессию еще и потому, что Java-разработчики получают самую большую зарплату. Хотя Python начинает догонять Java по многим моментам, но вот в крупном екоме разработке Джава все-таки остается главенствующей сейчас. Скажу так – полнота программы и интенсивность присуща обоим курсам GeekBrains. Хочу отметить, что с первого дня занятий вы приступаете к практике и получаете опыт коммерческой разработки уже в свое резюме. Скажу вам как прошедший это – реально помогло в трудоустройстве!",
		createdAt: new Date(),
		rating: 4
	};

	const revs = [rev1, rev2];

	return (
		<div className={className} {...props}>
			<Card className={styles.product}>
				<div className={styles.logo}>
					<Image
						src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
						alt={product.title}
						width={70}
						height={70}
					/>
				</div>
				<div className={styles.title}>
					{product.title}
				</div>
				<div className={styles.price}>
					{priceRu(product.price)}
					{product.oldPrice && <Tag className={styles.oldPrice} color='green'>{priceRu(product.price - product.oldPrice)}</Tag>}
				</div>
				<div className={styles.credit}>
					{priceRu(product.credit)}<span>/мес</span>
				</div>
				<div className={styles.rating}>
					<Rating rating={product.reviewAvg ?? product.initialRating} />
				</div>
				<div className={styles.tags}>
					{product.categories.map(c => <Tag className={styles.category} color='ghost' key={c}>{c}</Tag>)}
				</div>
				<div className={styles.priceTitle}>
					цена
				</div>
				<div className={styles.creditTitle}>
					в кредит
				</div>
				<div className={styles.rateTitle}>
					<a href='#ref' onClick={scrollToReviews}>{product.reviewCount} {declOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}</a>
				</div>
				<Divider className={styles.hr} />
				<div className={styles.description}>
					{product.description}
				</div>
				<div className={styles.feature}>
					{product.characteristics.map(c => (
						<div className={styles.characteristic} key={c.name}>
							<span className={styles.characteristicName}>{c.name}</span>
							<span className={styles.characteristicDots}></span>
							<span className={styles.characteristicValue}>{c.value}</span>
						</div>
					))}
				</div>
				<div className={styles.advBlock}>
					{product.advantages && <div className={styles.advantages}>
						<div className={styles.advTitle}>Преимущества</div>
						<div>{product.advantages}</div>
					</div>}
					{product.disadvantages && <div className={styles.disadvantages}>
						<div className={styles.advTitle}>Недостатки</div>
						<div>{product.disadvantages}</div>
					</div>}
				</div>
				<Divider className={cn(styles.hr, styles.hr2)} />
				<div className={styles.actions}>
					<Button appearance='primary'>Узнать подробнее</Button>
					<Button
						onClick={() => setisReviewOpened(!isReviewOpened)}
						className={styles.reviewButton}
						appearance='ghost'
						arrow={isReviewOpened ? 'down' : 'right'}
					>Читать отзывы</Button>
				</div>
			</Card>
			<Card
				className={cn(styles.reviews, {
					[styles.opened]: isReviewOpened,
					[styles.closed]: !isReviewOpened,
				})}
				color='blue'
				ref={reviewRef}
			>
				{revs.map(r => (
					<div key={r._id}>
						<Review review={r} />
						<Divider />
					</div>
				))}
				<ReviewForm productId={product._id} />
			</Card>
		</div>
	);
};