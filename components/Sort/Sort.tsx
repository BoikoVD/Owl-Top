import { SortEnum, SortProps } from './Sort.props';
import cn from 'classnames';
import styles from './Sort.module.css';
import SortIcon from './sort.svg';

export const Sort = ({ sort, setSort, className, ...props }: SortProps): JSX.Element => {
	return (
		<div className={cn(styles.sort, className)} {...props}>
			<div className={styles.sortName} id='sort'>Сортировка</div>
			<button
				onClick={() => setSort(SortEnum.Rating)}
				className={cn({
					[styles.active]: sort == SortEnum.Rating
				})}
				aria-selected={sort == SortEnum.Rating}
				aria-labelledby='sort sortrating'
				id='sortrating'
			>
				<SortIcon className={styles.sortIcon} />По рейтингу
			</button>
			<button
				onClick={() => setSort(SortEnum.Price)}
				className={cn({
					[styles.active]: sort == SortEnum.Price
				})}
				aria-selected={sort == SortEnum.Price}
				aria-labelledby='sort sortprice'
				id='sortprice'
			>
				<SortIcon className={styles.sortIcon} />По цене
			</button>
		</div>
	);
};