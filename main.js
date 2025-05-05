const carcanvas = document.getElementById("carCanvas")
carcanvas.width = 200
const networkcanvas = document.getElementById("networkCanvas")
networkcanvas.width = 300

const carCtx = carcanvas.getContext("2d")
const networkCtx = networkcanvas.getContext("2d")
const road = new Road(carcanvas.width / 2, carcanvas.width * 0.9)
const car = new Car(road.getLaneCenter(1), 100, 30, 50, "AI")
const traffic = [new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY", 2)]

animate()

function animate() {
	for (let i = 0; i < traffic.length; i++) {
		traffic[i].update(road.borders, [])
	}
	car.update(road.borders, traffic)
	carcanvas.height = window.innerHeight
	networkcanvas.height = window.innerHeight
	carCtx.save()
	carCtx.translate(0, -car.y + carcanvas.height * 0.7)
	road.draw(carCtx)
	for (let i = 0; i < traffic.length; i++) {
		traffic[i].draw(carCtx, "red")
	}
	car.draw(carCtx, "blue")
	carCtx.restore()
	Visualizer.drawNetwork(networkCtx, car.brain)
	requestAnimationFrame(animate)
}
