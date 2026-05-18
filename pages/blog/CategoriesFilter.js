import Link from 'next/link'


const CategoriesFilter = (category) => {
    return (
        <div className='blog-filter-cat'>
            <ul>
                {
                    category?.category?.slice(0, 12).map((item, index) => (
                        <li key={index}>
                            <Link
                                href={{
                                    pathname: `/blog/categories/${item?.slug}`,
                                    query: { name: item?.name },
                                }}
                            >
                                {item?.name}
                            </Link>
                        </li>
                    ))
                }

                <li>
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            const moreItems = category?.category?.slice(12) || [];
                            const ul = e.currentTarget.closest('ul');
                            const dropdownLi = e.currentTarget.parentElement.nextElementSibling; // the existing dropdown li
                            moreItems.forEach((item) => {
                                const li = document.createElement('li');
                                const a = document.createElement('a');
                                a.href = `/blog/categories/${item?.slug}?name=${encodeURIComponent(item?.name)}`;
                                a.textContent = item?.name;
                                li.appendChild(a);
                                ul.insertBefore(li, dropdownLi);
                            });
                            // remove the inline "More" link after expanding
                            e.currentTarget.parentElement.remove();
                        }}
                    >
                        More
                    </a>
                </li>

                {/* 
                <li>
                    <Dropdown className='cat-dropdown'>
                        <Dropdown.Toggle id="dropdown-category">
                            More
                        </Dropdown.Toggle>

                        <Dropdown.Menu className='cat-dropdown-menu'>
                            {
                                category?.category?.slice(12).map((item, index) => (
                                    <li key={index}>
                                        <Link
                                            href={{
                                                pathname: `/blog/categories/${item?.slug}`,
                                                query: { name: item?.name },
                                            }}
                                        >
                                            {item?.name}
                                        </Link>
                                    </li>
                                ))
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                </li> */}
            </ul>
        </div>
    )
}


export default CategoriesFilter