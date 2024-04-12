const root = document.querySelector('#root')
let sourceDroplist = null
let targetDroplist = null

const droplistItems = [
	{
		id: 1,
		title: 'Mouse',
		price: 30,
	},
	{
		id: 2,
		title: 'Headphones',
		price: 50,
	},
	{
		id: 3,
		title: 'Mouse',
		price: 45,
	},
	{
		id: 4,
		title: 'Monitor',
		price: 250,
	},
	{
		id: 5,
		title: 'GPU',
		price: 500,
	},
	{
		id: 6,
		title: 'Mousepad',
		price: 10,
	},
	{
		id: 8,
		title: 'CPU',
		price: 250,
	},
	{
		id: 9,
		title: 'Microphone',
		price: 99,
	},
	{
		id: 10,
		title: 'Keyboard',
		price: 105,
	},
	{
		id: 11,
		title: 'Charger',
		price: 59,
	},
]

const selectedItemsIds = {
	source: [],
	target: [],
}

window.addEventListener('load', () => {
	root.innerHTML = `<div class="picklist">
	<div class="droplist-group">
		<div class="controls-group picklist-source-controls">
			<button type="button" onclick='reposition("up", "source")'><svg stroke="currentColor"
					fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="32px" width="32px"
					xmlns="http://www.w3.org/2000/svg">
					<path fill="none" d="M0 0h24v24H0z"></path>
					<path d="M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z"></path>
				</svg>
			</button>
			<button type="button" onclick='reposition("top", "source")'><svg stroke="currentColor"
					fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="32px" width="32px"
					xmlns="http://www.w3.org/2000/svg">
					<path fill="none" d="M0 0h24v24H0z"></path>
					<path d="M6 17.59 7.41 19 12 14.42 16.59 19 18 17.59l-6-6z"></path>
					<path d="m6 11 1.41 1.41L12 7.83l4.59 4.58L18 11l-6-6z"></path>
				</svg>
			</button>
			<button type="button" onclick='reposition("down", "source")'><svg stroke="currentColor"
					fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="32px" width="32px"
					xmlns="http://www.w3.org/2000/svg">
					<path fill="none" d="M0 0h24v24H0V0z"></path>
					<path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path>
				</svg>
			</button>
			<button type="button" onclick='reposition("bottom", "source")'><svg stroke="currentColor"
					fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="32px" width="32px"
					xmlns="http://www.w3.org/2000/svg">
					<path fill="none" d="M0 0h24v24H0z"></path>
					<path d="M18 6.41 16.59 5 12 9.58 7.41 5 6 6.41l6 6z"></path>
					<path d="m18 13-1.41-1.41L12 16.17l-4.59-4.58L6 13l6 6z"></path>
				</svg>
			</button>
		</div>
		<div class="picklist-wrapper picklist-source-wrapper">
			<div class="picklist-header">Available</div>
			<input type="text" placeholder='Search by name' name='search-source' id='search-source'
				onkeyup='handleSearch(event, "source")'>
			<ul class="droplist droplist-source"></ul>
		</div>
		<div class="controls-group picklist-transfer-buttons">
			<button type="button" onclick='moveSelected("target")'><svg stroke="currentColor"
					fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="32px" width="32px"
					xmlns="http://www.w3.org/2000/svg">
					<path fill="none" d="M0 0h24v24H0V0z"></path>
					<path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"></path>
				</svg>
			</button>
			<button type="button" onclick='moveAll("target")'><svg stroke="currentColor" fill="currentColor"
					stroke-width="0" viewBox="0 0 24 24" height="32px" width="32px"
					xmlns="http://www.w3.org/2000/svg">
					<path fill="none" d="M0 0h24v24H0z"></path>
					<path d="M6.41 6 5 7.41 9.58 12 5 16.59 6.41 18l6-6z"></path>
					<path d="m13 6-1.41 1.41L16.17 12l-4.58 4.59L13 18l6-6z"></path>
				</svg>
			</button>
			<button type="button" onclick='moveSelected("source")'><svg stroke="currentColor"
					fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="32px" width="32px"
					xmlns="http://www.w3.org/2000/svg">
					<path fill="none" d="M0 0h24v24H0V0z"></path>
					<path d="M15.41 16.59 10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"></path>
				</svg>
			</button>
			<button type="button" onclick='moveAll("source")'><svg stroke="currentColor" fill="currentColor"
					stroke-width="0" viewBox="0 0 24 24" height="32px" width="32px"
					xmlns="http://www.w3.org/2000/svg">
					<path fill="none" d="M0 0h24v24H0z"></path>
					<path d="M17.59 18 19 16.59 14.42 12 19 7.41 17.59 6l-6 6z"></path>
					<path d="m11 18 1.41-1.41L7.83 12l4.58-4.59L11 6l-6 6z"></path>
				</svg>
			</button>
		</div>
		<div class="picklist-wrapper picklist-target-wrapper">
			<div class="picklist-header">Selected</div>
			<input type="text" placeholder='Search by name' name='search-target' id='search-target'
				onkeyup='handleSearch(event, "target")'>
			<ul class="droplist droplist-target"></ul>
		</div>
		<div class="controls-group picklist-target-controls">
			<button type="button" onclick='reposition("up", "target")'><svg stroke="currentColor"
					fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="32px" width="32px"
					xmlns="http://www.w3.org/2000/svg">
					<path fill="none" d="M0 0h24v24H0z"></path>
					<path d="M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z"></path>
				</svg>
			</button>
			<button type="button" onclick='reposition("top", "target")'><svg stroke="currentColor"
					fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="32px" width="32px"
					xmlns="http://www.w3.org/2000/svg">
					<path fill="none" d="M0 0h24v24H0z"></path>
					<path d="M6 17.59 7.41 19 12 14.42 16.59 19 18 17.59l-6-6z"></path>
					<path d="m6 11 1.41 1.41L12 7.83l4.59 4.58L18 11l-6-6z"></path>
				</svg>
			</button>
			<button type="button" onclick='reposition("down", "target")'><svg stroke="currentColor"
					fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="32px" width="32px"
					xmlns="http://www.w3.org/2000/svg">
					<path fill="none" d="M0 0h24v24H0V0z"></path>
					<path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path>
				</svg>
			</button>
			<button type="button" onclick='reposition("bottom", "target")'><svg stroke="currentColor"
					fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="32px" width="32px"
					xmlns="http://www.w3.org/2000/svg">
					<path fill="none" d="M0 0h24v24H0z"></path>
					<path d="M18 6.41 16.59 5 12 9.58 7.41 5 6 6.41l6 6z"></path>
					<path d="m18 13-1.41-1.41L12 16.17l-4.59-4.58L6 13l6 6z"></path>
				</svg>
			</button>
		</div>
	</div>
	</div>
	<form class='user-controls' onsubmit='handleAddItem(event)'>
		<span>Add a new item</span>
		<label>
			Enter a title:
			<input type="text" name="title" id="title" placeholder='Title'>
		</label>
		<label>
			Enter price:
			<input type="number" name="price" id="price" placeholder='Price'>
		</label>
		<div class='user-controls-buttons'>
			<button type="button" onclick='randomize()'>Randomize</button>
			<button type="submit">Add</button>
		</div>
	</form>`

	sourceDroplist = document.querySelector('.droplist.droplist-source')
	targetDroplist = document.querySelector('.droplist.droplist-target')

	droplistItems.forEach((item) => {
		const element = createDroplistItem(item.id, item.title, item.price)

		sourceDroplist.appendChild(element)
	})
})

function createDroplistItem(id, title, price) {
	const li = document.createElement('li')
	const div = document.createElement('div')
	const span = document.createElement('span')
	li.setAttribute('isSelected', 'false')
	li.setAttribute('containerType', 'source')
	li.setAttribute('itemId', `${id}`)
	div.textContent = title
	span.textContent = `$${price}`
	li.appendChild(div)
	li.appendChild(span)

	li.addEventListener('click', () => {
		if (li.getAttribute('isSelected') === 'true') {
			li.setAttribute('isSelected', 'false')
			li.style.backgroundColor = 'white'

			// deleting item's id from the list
			selectedItemsIds[li.getAttribute('containerType')] = selectedItemsIds[
				li.getAttribute('containerType')
			].filter((id) => id !== parseInt(li.getAttribute('itemId')))
		} else {
			li.setAttribute('isSelected', 'true')
			li.style.backgroundColor = '#F4D58D'

			selectedItemsIds[li.getAttribute('containerType')].push(
				parseInt(li.getAttribute('itemId'))
			)
		}
	})

	return li
}

function moveSelected(containerType) {
	let elements = null
	let container = null

	if (containerType === 'source') {
		elements = new Array(...targetDroplist.children)
		container = sourceDroplist
	} else if (containerType === 'target') {
		elements = new Array(...sourceDroplist.children)
		container = targetDroplist
	}

	for (const itemId of selectedItemsIds[changeKey(containerType)]) {
		const elementToMove = elements.find(
			(element) => parseInt(element.getAttribute('itemId')) === itemId
		)

		elementToMove.setAttribute('isSelected', 'false')
		elementToMove.style.backgroundColor = 'transparent'

		changeElementContainerType(elementToMove)

		selectedItemsIds[changeKey(containerType)] = selectedItemsIds[
			changeKey(containerType)
		].filter((id) => id !== itemId)

		container.appendChild(elementToMove)
	}
}

function moveAll(containerType) {
	let elements = null
	let container = null

	if (containerType === 'source') {
		elements = new Array(...targetDroplist.children)
		container = sourceDroplist
	} else if (containerType === 'target') {
		elements = new Array(...sourceDroplist.children)
		container = targetDroplist
	}

	elements.forEach((element) => {
		element.setAttribute('isSelected', 'false')
		element.style.backgroundColor = 'transparent'

		changeElementContainerType(element)

		container.appendChild(element)
	})

	selectedItemsIds[changeKey(containerType)] = []
}

function reposition(posistion, containerType) {
	let elements = null
	let container = null

	if (containerType === 'source') {
		elements = new Array(...sourceDroplist.children)
		container = sourceDroplist
	} else if (containerType === 'target') {
		elements = new Array(...targetDroplist.children)
		container = targetDroplist
	}

	// return if no items selected
	if (selectedItemsIds[containerType].length === 0) return

	// matching ids to its items
	const elementsToReposition = elements.filter((element) =>
		selectedItemsIds[containerType].includes(
			parseInt(element.getAttribute('itemId'))
		)
	)

	if (posistion === 'up') {
		if (elements.indexOf(elementsToReposition[0]) === 0) return

		for (const element of elementsToReposition) {
			const index = elements.indexOf(element)

			container.insertBefore(element, container.children[index - 1])
		}
	} else if (posistion === 'down') {
		if (elements.indexOf(elementsToReposition.at(-1)) === elements.length - 1)
			return

		for (let i = elementsToReposition.length - 1; i >= 0; i--) {
			const index = elements.indexOf(elementsToReposition[i])

			container.children[index + 1].after(elementsToReposition[i])
		}
	} else if (posistion === 'top') {
		// how many elements until the index 0
		const delta = elements.indexOf(elementsToReposition[0])

		if (delta === 0) return

		for (const element of elementsToReposition) {
			const index = elements.indexOf(element)

			container.insertBefore(element, container.children[index - delta])
		}
	} else if (posistion === 'bottom') {
		// how many elements until the index elements.length - 1 (last index)
		const delta =
			elements.length - elements.indexOf(elementsToReposition.at(-1)) - 1

		if (delta === 0) return

		for (let i = elementsToReposition.length - 1; i >= 0; i--) {
			const index = elements.indexOf(elementsToReposition[i])

			container.children[index + delta].after(elementsToReposition[i])
		}
	}
}

function handleSearch(e, containerType) {
	let container = null
	const value = e.target.value

	if (containerType === 'source') {
		container = sourceDroplist.children
	} else if (containerType === 'target') {
		container = targetDroplist.children
	}

	for (let i = 0; i < container.length; i++) {
		if (!container[i].textContent.toLowerCase().includes(value)) {
			container[i].style.display = 'none'
		} else {
			container[i].style.display = ''
		}
	}
}

function handleAddItem(e) {
	e.preventDefault()

	const title = e.target[0].value
	const price = e.target[1].value
	const id = droplistItems.length + 2

	droplistItems.push({
		id,
		title,
		price,
	})

	const li = createDroplistItem(id, title, price)

	sourceDroplist.appendChild(li)
}

async function randomize() {
	const title = await fetch('https://random-word-api.herokuapp.com/word').then(
		(res) => res.json()
	)
	const price = Math.floor(Math.random() * 1000 + 1)

	const titleInput = document.querySelector('#title')
	const priceInput = document.querySelector('#price')

	titleInput.value = title
	priceInput.value = price
}

function changeKey(key) {
	return key === 'source' ? 'target' : 'source'
}

function changeElementContainerType(element) {
	const newContainerType =
		element.getAttribute('containerType') === 'source' ? 'target' : 'source'

	element.setAttribute('containerType', newContainerType)
}
