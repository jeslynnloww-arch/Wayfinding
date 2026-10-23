const destinations = {
  window: { name: 'Window seat', point: [390, 107], minutes: 1, steps: ['From the entrance, head straight past the communal table.', 'Your seat is along the big front windows. Pick any open one.'], accessible: ['Follow the wide aisle straight ahead.', 'Window seats are along the front windows.'] },
  counter: { name: 'Order counter', point: [148, 86], minutes: 1, steps: ['Turn left as you come in.', 'The counter is just ahead, beneath the menu board.'], accessible: ['Take the clear aisle to your left.', 'The counter is straight ahead.'] },
  communal: { name: 'Communal table', point: [305, 207], minutes: 1, steps: ['Walk straight in, past the entrance.', 'The long table is in the middle of the room.'], accessible: ['Follow the wide central aisle.', 'The communal table is in the middle of the room.'] },
  nook: { name: 'Reading nook', point: [469, 220], minutes: 1, steps: ['Walk past the communal table and keep right.', 'The tucked-away nook is in the back corner.'], accessible: ['Continue along the open aisle on your right.', 'The nook is in the back corner.'] },
  restroom: { name: 'Restroom', point: [112, 202], minutes: 1, steps: ['Turn left at the counter and follow the wall.', 'The restroom door is the first one on your right.'], accessible: ['Take the wide aisle beside the counter.', 'The restroom is on your right, just beyond the counter.'] },
  garden: { name: 'Garden patio', point: [633, 115], minutes: 2, steps: ['Head to the back right corner of the café.', 'Go through the glass door to the garden.'], accessible: ['Follow the clear route around the communal table.', 'The patio entrance is level with the café floor.'] },
  lounge: { name: 'Lounge', point: [205, 317], minutes: 1, steps: ['From the entrance, turn left after the counter.', 'The lounge seats are in the cozy corner.'], accessible: ['Use the open path to the left of the central table.', 'The lounge is in the cozy corner.'] }
};
const destination = document.querySelector('#destination');
const accessible = document.querySelector('#accessible');
const route = document.querySelector('#routePath');
const pin = document.querySelector('#destinationPin');
const directions = document.querySelector('#directions');
const mapStatus = document.querySelector('#mapStatus');
const routes = {
  window: 'M297 409 L297 278 Q297 270 305 270 L305 125 L390 125 L390 107',
  counter: 'M297 409 L297 278 Q297 270 250 270 L148 270 L148 116 L148 86',
  communal: 'M297 409 L297 270 L305 270 L305 207',
  nook: 'M297 409 L297 278 Q297 270 410 270 L469 270 L469 220',
  restroom: 'M297 409 L297 278 Q297 270 170 270 L112 270 L112 202',
  garden: 'M297 409 L297 278 Q297 270 510 270 L545 270 L545 115 L633 115',
  lounge: 'M297 409 L297 278 Q297 270 205 270 L205 317'
};
function showRoute() {
  const key = destination.value;
  const place = destinations[key];
  const steps = accessible.checked ? place.accessible : place.steps;
  route.setAttribute('d', routes[key]);
  route.classList.remove('active');
  void route.getBoundingClientRect();
  route.classList.add('active');
  pin.setAttribute('cx', place.point[0]); pin.setAttribute('cy', place.point[1]); pin.setAttribute('r', '9');
  mapStatus.textContent = `ROUTE TO ${place.name.toUpperCase()}`;
  directions.innerHTML = `<div class="route-result"><div class="route-result-head"><div><strong>${place.name}</strong><small>${accessible.checked ? 'Step-free route' : 'From the entrance'}</small></div><span class="walk-badge">↗ &nbsp;${place.minutes} min walk</span></div>${steps.map((step, i) => `<div class="route-step"><span class="step-num">${i + 1}</span><span>${step}</span></div>`).join('')}</div>`;
}
document.querySelector('#routeButton').addEventListener('click', showRoute);
destination.addEventListener('change', () => { if (pin.getAttribute('r') !== '0') showRoute(); });
accessible.addEventListener('change', () => { if (pin.getAttribute('r') !== '0') showRoute(); });
let zoom = 100;
function setZoom(value) { zoom = Math.min(130, Math.max(80, value)); document.querySelector('#zoomLevel').textContent = `${zoom}%`; document.querySelector('.floor-map').style.transform = `scale(${zoom / 100})`; }
document.querySelector('#zoomIn').addEventListener('click', () => setZoom(zoom + 10));
document.querySelector('#zoomOut').addEventListener('click', () => setZoom(zoom - 10));
let toastTimer;
function toast(message) { const el = document.querySelector('#toast'); el.textContent = message; el.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('show'), 2600); }
document.querySelector('#helpButton').addEventListener('click', () => toast('Our team is right at the counter. Just wave and we’ll come over.'));
