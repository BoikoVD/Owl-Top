import { TopPageComponentProps } from './TopPageComponent.props';
import styles from './TopPageComponent.module.css';
import { Adventages, HhData, Htag, Product, Sort, Tag } from '../../components';
import { TopLevelCategory } from '../../interfaces/page.interface';
import { SortEnum } from '../../components/Sort/Sort.props';
import { useEffect, useReducer } from 'react';
import { sortReducer } from './sort.reducer';
import { useReducedMotion } from 'framer-motion';

export const TopPageComponent = ({ page, products, firstCategory }: TopPageComponentProps): JSX.Element => {
	const [{ products: sortedProducts, sort }, dispathSort] = useReducer(sortReducer, { products, sort: SortEnum.Rating });
	const shouldReduceMotion = useReducedMotion();

	const setSort = (sort: SortEnum) => {
		dispathSort({ type: sort });
	};

	useEffect(() => {
		dispathSort({ type: 'RESET', initialState: products });
	}, [products]);

	return (
		<div className={styles.wrapper}>
			<div className={styles.title}>
				<Htag tag='h1'>{page.title}</Htag>
				{products && <Tag color='gray' size='m' aria-label={products.length + 'элементов'}>{products.length}</Tag>}
				<Sort sort={sort} setSort={setSort} />
			</div>
			<div role='list'>
				{sortedProducts && sortedProducts.map(p => (<Product product={p} layout={shouldReduceMotion ? false : true} role='listitem' key={p._id} />))}
			</div>
			<div className={styles.hhTitle}>
				<Htag tag='h2'>Вакансии - {page.category}</Htag>
				<Tag color='red' size='m'>hh.ru</Tag>
			</div>
			{firstCategory == TopLevelCategory.Courses && page.hh && <HhData {...page.hh} />}
			{page.advantages && page.advantages.length > 0 && (
				<>
					<Htag tag='h2'>Преимущества</Htag>
					<Adventages advantages={page.advantages} />
				</>
			)}
			{page.seoText && <div className={styles.seo} dangerouslySetInnerHTML={{ __html: page.seoText }} />}
			<Htag tag='h2'>Получаемые навыки</Htag>
			{page.tags.map(t => <Tag color='primary' key={t}>{t}</Tag>)}
		</div>
	);
};