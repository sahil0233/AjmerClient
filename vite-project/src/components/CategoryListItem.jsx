import React, { useState } from 'react'

const CategoryListItem = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleIsOpen = ()=> {
        setIsOpen(!isOpen);
    }
  return (
    <div className='flex justify-between'>
        <div>
            <h1>{props.categoryName}</h1>
            <div>
                {isOpen?
                    <ul className='pl-4'>
                        {props.subCategories.map(cat =>(
                            <li>{cat}</li>
                        ))}
                    </ul>:
                    <h2 className=' w-40 whitespace-nowrap overflow-hidden overflow-ellipsis'>{props.subCategories.join(", ")}</h2>
                }
            </div>
        </div>
        {isOpen?
            <button onClick={toggleIsOpen} className='self-start'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="50" height="50">
                    <line x1="20" y1="50" x2="80" y2="50" stroke="black" strokeWidth="10" />
                </svg>
            </button>:
            <button onClick={toggleIsOpen} className='self-start'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="50" height="50">
                    <line x1="30" y1="50" x2="70" y2="50" stroke="black" strokeWidth="10" />
                    <line x1="50" y1="30" x2="50" y2="70" stroke="black" strokeWidth="10" />
                </svg>
            </button>
        
          
         }
        
        
      
    </div>
  )
}

export default CategoryListItem

