"""
MathCLI Pro - Advanced Numerology Visualizations
Vortex Math, Sacred Geometry, Perfect Numbers, Digital Roots
"""

from manim import *
import numpy as np

class VortexMathDoubling(Scene):
    """
    Vortex Math - The Doubling Circuit (1-2-4-8-7-5)
    Tesla's 3-6-9 pattern revealed through digit sum doubling
    """
    
    def construct(self):
        # Title
        title = Text("Vortex Math", font_size=48, color=PURPLE)
        title.to_edge(UP)
        self.play(Write(title))
        
        subtitle = Text("The Doubling Circuit", font_size=28)
        subtitle.next_to(title, DOWN)
        self.play(FadeIn(subtitle))
        
        # The doubling sequence: 1, 2, 4, 8, 16(7), 32(5), 64(1)...
        # Digital roots: 1, 2, 4, 8, 7, 5, 1...
        
        # Create hexagon positions
        center = ORIGIN
        radius = 2.5
        positions = []
        labels = [1, 2, 4, 8, 7, 5]  # The doubling circuit
        
        for i in range(6):
            angle = -PI/2 + i * PI/3  # Start from top, go clockwise
            pos = np.array([
                radius * np.cos(angle),
                radius * np.sin(angle),
                0
            ])
            positions.append(pos)
        
        # Draw hexagon outline
        hexagon = RegularPolygon(6)
        hexagon.scale(2.5)
        hexagon.rotate(PI/6)
        hexagon.set_stroke(PURPLE, width=2, opacity=0.3)
        self.play(Create(hexagon))
        
        # Animate numbers appearing one by one
        circles = VGroup()
        number_texts = VGroup()
        
        for i, (pos, num) in enumerate(zip(positions, labels)):
            circle = Circle(radius=0.6)
            circle.move_to(pos)
            circle.set_stroke(PURPLE, width=3)
            circle.set_fill(PURPLE, opacity=0.2)
            
            num_text = Text(str(num), font_size=36)
            num_text.move_to(pos)
            
            self.play(
                Create(circle),
                FadeIn(num_text),
                run_time=0.5
            )
            circles.add(circle)
            number_texts.add(num_text)
        
        # Animate the doubling circuit with arrows
        self.wait(0.5)
        
        # Draw curved arcs showing the path (without ArrowTip complexity)
        path_arcs = VGroup()
        for i in range(6):
            start_idx = i
            end_idx = (i + 1) % 6
            
            # Use simple CurvedArrow from mobject
            arc = CurvedArrow(
                positions[start_idx],
                positions[end_idx],
                angle=-PI/3
            )
            arc.set_stroke(YELLOW, width=2)
            path_arcs.add(arc)
        
        self.play(
            LaggedStartMap(Create, path_arcs, lag_ratio=0.15),
            run_time=2
        )
        
        # Show the cycle
        cycle_text = Text(
            "1 x 2 = 2 → 2 x 2 = 4 → 4 x 2 = 8 → 16 = 7 → 32 = 5 → 64 = 1",
            font_size=20
        )
        cycle_text.to_edge(DOWN)
        self.play(Write(cycle_text))
        
        self.wait(1)
        
        # Highlight 3, 6, 9 as the controllers
        self.play(FadeOut(arrows))
        
        # Create center circle with 3-6-9
        center_circle = Circle(radius=0.8)
        center_circle.move_to(ORIGIN)
        center_circle.set_stroke(GOLD, width=3)
        center_circle.set_fill(GOLD, opacity=0.3)
        self.play(Create(center_circle))
        
        controllers = VGroup()
        for i, num in enumerate([3, 6, 9]):
            small_circle = Circle(radius=0.35)
            angle = -PI/2 + i * 2*PI/3
            pos = 0.8 * np.array([np.cos(angle), np.sin(angle), 0])
            small_circle.move_to(pos)
            small_circle.set_stroke(GOLD, width=2)
            
            num_text = Text(str(num), font_size=24, color=GOLD)
            num_text.move_to(pos)
            
            controllers.add(small_circle, num_text)
        
        self.play(FadeIn(controllers))
        
        # Tesla quote
        tesla_quote = Text(
            '"If you only knew the magnificence of the 3, 6 and 9,',
            font_size=22,
            color=GOLD
        )
        tesla_quote.to_edge(DOWN).shift(UP * 0.5)
        
        tesla_quote2 = Text(
            'then you would have a key to the universe." - Tesla',
            font_size=22,
            color=GOLD
        )
        tesla_quote2.next_to(tesla_quote, DOWN)
        
        self.play(FadeOut(cycle_text))
        self.play(Write(tesla_quote), Write(tesla_quote2))
        
        self.wait(3)


class DigitalRoots9(Scene):
    """
    Digital Roots - The Power of 9
    Shows how all numbers reduce to 1-9, with 9 as the master
    """
    
    def construct(self):
        # Title
        title = Text("Digital Roots", font_size=44)
        title.to_edge(UP)
        self.play(Write(title))
        
        sub = Text("Casting Out Nines", font_size=28, color=BLUE)
        sub.next_to(title, DOWN)
        self.play(FadeIn(sub))
        
        # Create a 9x9 grid showing digital roots
        grid_size = 9
        cell_size = 0.6
        grid = VGroup()
        numbers = VGroup()
        
        colors = {
            1: RED, 2: ORANGE, 3: YELLOW, 4: GREEN,
            5: TEAL, 6: BLUE, 7: PURPLE, 8: PINK, 9: WHITE
        }
        
        start_x = -4
        start_y = 2
        
        for row in range(grid_size):
            for col in range(grid_size):
                num = row * grid_size + col + 1
                digital_root = self.digital_root(num)
                
                # Create cell
                rect = Square(side_length=cell_size)
                rect.move_to([
                    start_x + col * cell_size,
                    start_y - row * cell_size,
                    0
                ])
                rect.set_fill(colors[digital_root], opacity=0.3)
                rect.set_stroke(colors[digital_root], width=1)
                
                # Add number
                num_text = Text(str(digital_root), font_size=14)
                num_text.move_to(rect.get_center())
                
                grid.add(rect)
                numbers.add(num_text)
        
        self.play(
            LaggedStartMap(FadeIn, grid, lag_ratio=0.01),
            run_time=1
        )
        self.play(
            LaggedStartMap(FadeIn, numbers, lag_ratio=0.01),
            run_time=1
        )
        
        # Highlight the 9s
        nines = VGroup()
        for i, num_text in enumerate(numbers):
            rect = grid[i]
            if num_text.text == "9":
                rect.set_fill(WHITE, opacity=0.8)
                nines.add(rect)
        
        self.play(
            LaggedStartMap(
                lambda r: r.animate.scale(1.1),
                nines,
                lag_ratio=0.02
            ),
            run_time=1
        )
        
        # Show pattern
        pattern_text = Text(
            "Numbers 9, 18, 27, 36... all reduce to 9",
            font_size=24
        )
        pattern_text.to_edge(DOWN)
        self.play(Write(pattern_text))
        
        self.wait(1)
        
        # Formula
        formula = Text(
            "Digital Root(n) = 1 + (n - 1) mod 9",
            font_size=22,
            color=YELLOW
        )
        formula.next_to(pattern_text, UP)
        self.play(Write(formula))
        
        # Special property
        special = Text(
            "9 x any number = digital root always returns to 9",
            font_size=20,
            color=PURPLE
        )
        special.next_to(formula, UP)
        self.play(FadeIn(special))
        
        self.wait(3)
    
    def digital_root(self, n):
        """Calculate digital root of a number"""
        if n == 0:
            return 0
        return 1 + (n - 1) % 9


class PerfectNumbers(Scene):
    """
    Perfect Numbers - Numbers equal to sum of their divisors
    6, 28, 496, 8128, 33550336...
    """
    
    def construct(self):
        # Title
        title = Text("Perfect Numbers", font_size=44, color=GOLD)
        title.to_edge(UP)
        self.play(Write(title))
        
        # Definition
        def_text = Text(
            "A perfect number equals the sum of its proper divisors",
            font_size=24
        )
        def_text.next_to(title, DOWN)
        self.play(FadeIn(def_text))
        
        # First perfect number: 6
        self.wait(0.5)
        
        six = Text("6", font_size=72, color=TEAL)
        six.move_to(UP * 1 + LEFT * 4)
        self.play(Write(six))
        
        divisors_6 = VGroup()
        divs_6 = [1, 2, 3]
        for i, d in enumerate(divs_6):
            d_text = Text(str(d), font_size=36)
            d_text.move_to(UP * 1 + RIGHT * (1 + i * 1.2))
            divisors_6.add(d_text)
        
        self.play(LaggedStartMap(FadeIn, divisors_6, lag_ratio=0.2))
        
        # Show sum
        sum_text = Text("1 + 2 + 3 = 6", font_size=32, color=GREEN)
        sum_text.to_edge(LEFT).shift(DOWN * 0.5)
        self.play(Write(sum_text))
        
        # Checkmark
        check = Text("✓", font_size=48, color=GREEN)
        check.next_to(six, RIGHT, buff=0.3)
        self.play(FadeIn(check))
        
        self.wait(0.5)
        
        # Second: 28
        self.play(
            FadeOut(six), FadeOut(divisors_6), 
            FadeOut(sum_text), FadeOut(check)
        )
        
        twenty_eight = Text("28", font_size=72, color=TEAL)
        twenty_eight.move_to(UP * 1 + LEFT * 3)
        self.play(Write(twenty_eight))
        
        divs_28 = [1, 2, 4, 7, 14]
        divisors_28 = VGroup()
        for i, d in enumerate(divs_28):
            d_text = Text(str(d), font_size=28)
            d_text.move_to(UP * 1 + RIGHT * (0.5 + i * 1))
            divisors_28.add(d_text)
        
        self.play(LaggedStartMap(FadeIn, divisors_28, lag_ratio=0.15))
        
        sum_28 = Text("1+2+4+7+14 = 28", font_size=28, color=GREEN)
        sum_28.to_edge(LEFT).shift(DOWN * 0.5)
        self.play(Write(sum_28))
        
        check2 = Text("✓", font_size=48, color=GREEN)
        check2.next_to(twenty_eight, RIGHT, buff=0.3)
        self.play(FadeIn(check2))
        
        self.wait(0.5)
        
        # Show list of known perfect numbers
        self.play(
            FadeOut(twenty_eight), FadeOut(divisors_28),
            FadeOut(sum_28), FadeOut(check2), FadeOut(def_text)
        )
        
        perfect_nums = [
            (6, "Known since antiquity"),
            (28, "Known since antiquity"),
            (496, "Discovery: ~300 BCE"),
            (8128, "Discovery: ~100 CE"),
            (33550336, "Discovery: 1456"),
        ]
        
        list_title = Text("Known Perfect Numbers", font_size=32)
        list_title.to_edge(UP)
        self.play(Write(list_title))
        
        perfect_list = VGroup()
        for i, (num, desc) in enumerate(perfect_nums):
            num_text = Text(f"{num:,}", font_size=28, color=TEAL)
            desc_text = Text(desc, font_size=18, color=GRAY)
            
            row = VGroup(num_text, desc_text)
            row.arrange(RIGHT, buff=0.5)
            row.move_to(DOWN * (0.5 + i * 0.6))
            perfect_list.add(row)
        
        self.play(LaggedStartMap(FadeIn, perfect_list, lag_ratio=0.2))
        
        # Formula connection
        formula_text = Text(
            "Perfect numbers = 2^(p-1) × (2^p - 1) where (2^p - 1) is prime",
            font_size=20,
            color=GOLD
        )
        formula_text.to_edge(DOWN)
        self.play(Write(formula_text))
        
        self.wait(3)


class UlamSpiralDetailed(MovingCameraScene):
    """
    Enhanced Ulam Spiral with zoom and pattern highlighting
    """
    
    def construct(self):
        # Title
        title = Text("Ulam Spiral", font_size=40)
        title.to_edge(UP)
        self.add(title)
        
        # Generate spiral coordinates
        def spiral_coords(n):
            if n == 1:
                return (0, 0)
            k = int(np.ceil((np.sqrt(n) - 1) / 2))
            t = 2 * k + 1
            m = t ** 2
            t = t - 1
            if n >= m - t:
                return (k - (m - n), -k)
            else:
                m = m - t
                if n >= m - t:
                    return (-k, -k + (m - n))
                else:
                    m = m - t
                    if n >= m - t:
                        return (-k + (m - n), k)
                    else:
                        return (k, k - (m - n - t))
        
        def is_prime(n):
            if n < 2: return False
            if n == 2: return True
            if n % 2 == 0: return False
            for i in range(3, int(np.sqrt(n)) + 1, 2):
                if n % i == 0: return False
            return True
        
        # Create spiral with animation
        n_max = 400
        scale = 0.08
        
        # Draw all dots
        all_dots = VGroup()
        prime_dots = VGroup()
        
        for n in range(1, n_max + 1):
            x, y = spiral_coords(n)
            pos = np.array([x * scale, y * scale, 0])
            
            if is_prime(n):
                dot = Dot(point=pos, radius=0.04, color=BLUE)
                prime_dots.add(dot)
            else:
                dot = Dot(point=pos, radius=0.02, color=GRAY_E)
                all_dots.add(dot)
        
        # Animate non-primes first (faint)
        self.play(
            FadeIn(all_dots, lag_ratio=0.001),
            run_time=3
        )
        
        # Animate primes popping in
        self.play(
            LaggedStartMap(GrowFromCenter, prime_dots, lag_ratio=0.002),
            run_time=4
        )
        
        # Zoom into center
        self.play(
            self.camera.frame.animate.scale(0.3).move_to(ORIGIN),
            run_time=2
        )
        self.wait(1)
        
        # Zoom out
        self.play(
            self.camera.frame.animate.scale(3.3).move_to(ORIGIN),
            run_time=2
        )
        
        # Pattern explanation
        pattern = Text(
            "Diagonal lines suggest prime distribution patterns",
            font_size=24,
            color=YELLOW
        )
        pattern.to_edge(DOWN)
        self.play(FadeIn(pattern))
        
        info = Text(f"Showing primes 1-{n_max}", font_size=18)
        info.next_to(pattern, UP)
        self.play(FadeIn(info))
        
        self.wait(3)


if __name__ == "__main__":
    # Run individual animations:
    # python -m manim -pql numerology_v3.py VortexMathDoubling
    # python -m manim -pql numerology_v3.py DigitalRoots9
    # python -m manim -pql numerology_v3.py PerfectNumbers
    # python -m manim -pql numerology_v3.py UlamSpiralDetailed
    pass