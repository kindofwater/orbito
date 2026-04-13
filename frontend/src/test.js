function* fn() {
	yield 1;
	yield 2;
	yield 3;
	return "finish";
}

const a = fn();