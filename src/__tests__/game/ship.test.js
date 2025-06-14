import Ship from '../../game/ship';

describe('Ship', () => {
    it('should initialize with correct properties', () => {
        const ship = new Ship([0, 0], 3, 'horizontal');
        expect(ship.startPosition).toEqual([0, 0]);
        expect(ship.shipLength).toBe(3);
        expect(ship.rotation).toBe('horizontal');
        expect(ship.cells).toEqual([false, false, false]);
    });

    it('should detect hit positions correctly (horizontal)', () => {
        const ship = new Ship([2, 0], 3, 'horizontal');
        // Should be on ship
        expect(ship.isHit([2, 0])).toBe(true);
        expect(ship.isHit([3, 0])).toBe(true);
        expect(ship.isHit([4, 0])).toBe(true);
        // Should not be on ship
        expect(ship.isHit([5, 0])).toBe(false);
        expect(ship.isHit([0, 0])).toBe(false);
        expect(ship.isHit([1, 0])).toBe(false);
        expect(ship.isHit([-1, 0])).toBe(false);
    });

    it('should detect hit positions correctly (vertical)', () => {
        const ship = new Ship([0, 2], 3, 'vertical');
        // Should be on ship
        expect(ship.isHit([0, 2])).toBe(true);
        expect(ship.isHit([0, 3])).toBe(true);
        expect(ship.isHit([0, 4])).toBe(true);
        // Should not be on ship
        expect(ship.isHit([0, 5])).toBe(false);
        expect(ship.isHit([0, 0])).toBe(false);
        expect(ship.isHit([0, 1])).toBe(false);
        expect(ship.isHit([0, -1])).toBe(false);
    });

    it('should mark cells as hit (horizontal)', () => {
        const ship = new Ship([2, 0], 3, 'horizontal');
        ship.hit([2, 0]);
        expect(ship.cells[0]).toBe(true);
        ship.hit([1, 0]);
        expect(ship.cells[1]).toBe(true);
        ship.hit([0, 0]);
        expect(ship.cells[2]).toBe(true);
    });

    it('should mark cells as hit (vertical)', () => {
        const ship = new Ship([0, 2], 3, 'vertical');
        ship.hit([0, 2]);
        expect(ship.cells[0]).toBe(true);
        ship.hit([0, 1]);
        expect(ship.cells[1]).toBe(true);
        ship.hit([0, 0]);
        expect(ship.cells[2]).toBe(true);
    });

    it('should report sunk status correctly', () => {
        const ship = new Ship([2, 0], 2, 'horizontal');
        expect(ship.isSunk()).toBe(false);
        ship.hit([2, 0]);
        expect(ship.isSunk()).toBe(false);
        ship.hit([1, 0]);
        expect(ship.isSunk()).toBe(true); 
    });

    it("should return all of it's positions correctly", () => {
        const ship = new Ship([2, 0], 2, "horizontal");
        expect(ship.getAllSquarePositions()).toEqual([[2, 0], [2, 1]]);
    });
});