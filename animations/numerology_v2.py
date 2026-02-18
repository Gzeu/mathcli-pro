"""
MathCLI Pro - REAL Mathematical Animations
3Blue1Brown-style visual transformations and demonstrations
"""

from manim import *
import numpy as np

class FibonacciSpiralBuild(Scene):
    """
    Fibonacci Spiral - Construiește pătratele și spirala ANIMAT pas cu pas
    Demonstrează VIZUAL cum apare golden ratio din Fibonacci
    """
    
    def construct(self):
        # Title
        title = Text("Fibonacci Spiral", font_size=40)
        title.to_edge(UP)
        self.play(Write(title))
        self.wait(0.5)
        
        # Fibonacci sequence
        fib = [1, 1, 2, 3, 5, 8, 13, 21]
        scale = 0.35
        
        # Colors for each square
        colors = [RED, ORANGE, YELLOW, GREEN, TEAL, BLUE, PURPLE, PINK]
        
        squares = VGroup()
        numbers = VGroup()
        
        # Starting position (center-left)
        origin = LEFT * 3 + DOWN * 1
        current_pos = origin
        
        # Direction cycle for spiral: RIGHT, UP, LEFT, DOWN
        directions = [RIGHT, UP, LEFT, DOWN]
        corners = [UR, UL, DL, DR]  # Corner to draw arc from
        
        spiral_arcs = VGroup()
        
        for i, f in enumerate(fib):
            # Create square with animation
            sq = Square(side_length=f * scale)
            sq.set_stroke(colors[i % len(colors)], width=3)
            sq.set_fill(colors[i % len(colors)], opacity=0.2)
            
            # Position based on spiral pattern
            if i == 0:
                sq.move_to(current_pos)
                current_pos = sq.get_corner(UR)
            elif i == 1:
                sq.next_to(squares[-1], RIGHT, buff=0)
                sq.align_to(squares[-1], UP)
                current_pos = sq.get_corner(UR)
            elif i == 2:
                sq.next_to(squares[-1], UP, buff=0)
                sq.align_to(squares[-1], LEFT)
                current_pos = sq.get_corner(UL)
            elif i == 3:
                sq.next_to(squares[-1], LEFT, buff=0)
                sq.align_to(squares[-1], DOWN)
                current_pos = sq.get_corner(DL)
            elif i == 4:
                sq.next_to(squares[-1], LEFT, buff=0)
                sq.align_to(squares[-1], UP)
                current_pos = sq.get_corner(UL)
            elif i == 5:
                sq.next_to(squares[-1], DOWN, buff=0)
                sq.align_to(squares[-1], LEFT)
                current_pos = sq.get_corner(DL)
            elif i == 6:
                sq.next_to(squares[-1], RIGHT, buff=0)
                sq.align_to(squares[-1], DOWN)
                current_pos = sq.get_corner(DR)
            elif i == 7:
                sq.next_to(squares[-1], RIGHT, buff=0)
                sq.align_to(squares[-1], DOWN)
                current_pos = sq.get_corner(DR)
            
            # Animate square appearing
            self.play(
                Create(sq),
                run_time=0.5
            )
            squares.add(sq)
            
            # Add number
            num = Text(str(f), font_size=20, color=colors[i % len(colors)])
            num.move_to(sq.get_center())
            self.play(FadeIn(num), run_time=0.2)
            numbers.add(num)
            
            # Draw spiral arc
            if i > 0:
                arc_radius = f * scale
                # Approximate arc using Arc
                arc = Arc(
                    radius=arc_radius,
                    start_angle=PI/2 * ((i-1) % 4),
                    angle=-PI/2,
                    arc_center=current_pos
                )
                arc.set_stroke(GOLD, width=2)
                self.play(Create(arc), run_time=0.3)
                spiral_arcs.add(arc)
        
        # Show the golden ratio emerging
        self.wait(1)
        
        # Calculate and show ratio
        ratio_text = VGroup()
        for i in range(2, len(fib)):
            ratio = fib[i] / fib[i-1]
            txt = Text(
                f"{fib[i]} ÷ {fib[i-1]} = {ratio:.6f}",
                font_size=18
            )
            txt.to_edge(RIGHT).shift(UP * (3 - i * 0.5))
            ratio_text.add(txt)
        
        self.play(LaggedStartMap(FadeIn, ratio_text, lag_ratio=0.1))
        
        # Show phi limit
        phi_text = Text(
            "φ = 1.618033988749...",
            font_size=32,
            color=GOLD
        )
        phi_text.to_edge(DOWN)
        self.play(Write(phi_text))
        
        self.wait(3)


class PrimeSpiralAnimated(Scene):
    """
    Ulam Spiral ANIMATED - prime numbers populează spirala treptat
    Arată VIZUAL cum primes formează pattern-uri
    """
    
    def construct(self):
        # Title
        title = Text("Ulam Prime Spiral", font_size=40)
        title.to_edge(UP)
        self.play(Write(title))
        
        # Info text
        info = Text("Prime numbers arranged in spiral reveal hidden patterns", font_size=20)
        info.next_to(title, DOWN)
        self.play(FadeIn(info))
        
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
        
        # Create dots progressively
        dots_group = VGroup()
        
        # Batch animations for efficiency
        batch_size = 50
        max_num = 300
        
        for batch_start in range(1, max_num, batch_size):
            batch_dots = VGroup()
            for n in range(batch_start, min(batch_start + batch_size, max_num + 1)):
                x, y = spiral_coords(n)
                if is_prime(n):
                    dot = Dot(
                        point=[x * 0.12, y * 0.12, 0],
                        radius=0.04,
                        color=BLUE_C
                    )
                    batch_dots.add(dot)
            
            if len(batch_dots) > 0:
                batch_dots.move_to(ORIGIN)
                self.play(
                    LaggedStartMap(
                        GrowFromCenter,
                        batch_dots,
                        lag_ratio=0.01,
                        run_time=0.8
                    )
                )
                dots_group.add(*batch_dots)
        
        # Highlight diagonal patterns
        self.wait(0.5)
        
        # Show pattern observation
        pattern_text = Text(
            "Diagonal lines reveal prime distribution patterns",
            font_size=24,
            color=YELLOW
        )
        pattern_text.to_edge(DOWN)
        self.play(Write(pattern_text))
        
        # Count primes shown
        prime_count = len(dots_group)
        count_text = Text(f"Showing {prime_count} primes (1-{max_num})", font_size=20)
        count_text.next_to(pattern_text, UP)
        self.play(FadeIn(count_text))
        
        self.wait(3)


class GoldenRatioVisualization(Scene):
    """
    Golden Ratio φ - Demonstrație VIZUALĂ a proporției divine
    Arată cum φ apare în geometrie și natură
    """
    
    def construct(self):
        # Title
        title = Text("The Golden Ratio", font_size=44, color=GOLD)
        title.to_edge(UP)
        self.play(Write(title))
        
        # Create golden rectangle
        PHI = (1 + np.sqrt(5)) / 2  # 1.618033...
        
        # Start with golden rectangle
        width = 6
        height = width / PHI
        
        rect = Rectangle(width=width, height=height)
        rect.set_stroke(GOLD, width=3)
        rect.set_fill(GOLD, opacity=0.1)
        
        self.play(Create(rect), run_time=1)
        
        # Show ratio labels (using Text until LaTeX is configured)
        width_label = Text("φ", font_size=40, color=WHITE)
        width_label.next_to(rect, DOWN)
        
        height_label = Text("1", font_size=40, color=WHITE)
        height_label.next_to(rect, LEFT)
        
        self.play(Write(width_label), Write(height_label))
        
        # Show the equation
        equation = Text("φ = (φ + 1) / φ = 1.618...", font_size=32)
        equation.to_edge(DOWN)
        self.play(Write(equation))
        
        self.wait(1)
        
        # Subdivide square
        square = Square(side_length=height)
        square.next_to(rect.get_left(), RIGHT, buff=0)
        square.set_stroke(BLUE, width=2)
        square.set_fill(BLUE, opacity=0.1)
        
        self.play(
            rect.animate.stretch_to_fit_width(width - height),
            Create(square),
            run_time=1
        )
        
        # The remaining rectangle is also golden
        smaller_golden = Text("Also φ", font_size=24, color=GOLD)
        smaller_golden.next_to(rect, UP)
        self.play(FadeIn(smaller_golden))
        
        self.wait(1)
        
        # Show pentagon with golden ratio
        self.play(
            FadeOut(rect), FadeOut(square),
            FadeOut(width_label), FadeOut(height_label),
            FadeOut(equation), FadeOut(smaller_golden)
        )
        
        # Regular pentagon - golden ratio in geometry
        pentagon = RegularPolygon(5)
        pentagon.set_stroke(BLUE, width=3)
        pentagon.scale(2)
        
        self.play(Create(pentagon))
        
        # Draw star inside
        vertices = pentagon.get_vertices()
        star_lines = VGroup()
        
        for i in range(5):
            line = Line(vertices[i], vertices[(i + 2) % 5])
            line.set_stroke(YELLOW, width=2)
            star_lines.add(line)
        
        self.play(Create(star_lines))
        
        # Show that diagonal/side = φ
        pentagon_info = Text(
            "Diagonal / Side = φ = 1.618...",
            font_size=28
        )
        pentagon_info.to_edge(DOWN)
        self.play(Write(pentagon_info))
        
        self.wait(2)
        
        # Final message
        final_text = Text(
            "φ appears throughout nature, art, and mathematics",
            font_size=24,
            color=GOLD
        )
        final_text.next_to(pentagon_info, UP)
        self.play(FadeIn(final_text))
        
        self.wait(3)


class NumberLineAnimation(Scene):
    """
    Number Line - Arată divizibilitate și proprietăți numerice
    Vizualizează ce fac numerele speciale
    """
    
    def construct(self):
        # Title
        title = Text("What Makes Numbers Special?", font_size=40)
        title.to_edge(UP)
        self.play(Write(title))
        
        # Create number line
        numbers_to_show = 30
        line_length = 12
        
        number_line = NumberLine(
            x_range=[0, numbers_to_show, 1],
            length=line_length,
            color=WHITE
        )
        number_line.center().shift(DOWN * 0.5)
        
        self.play(Create(number_line), run_time=2)
        
        # Animate numbers appearing one by one
        number_labels = VGroup()
        for i in range(1, numbers_to_show + 1):
            label = Text(str(i), font_size=16)
            pos = number_line.number_to_point(i)
            label.move_to(pos + DOWN * 0.4)
            number_labels.add(label)
        
        self.play(LaggedStartMap(FadeIn, number_labels, lag_ratio=0.05), run_time=2)
        
        # Highlight primes
        primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
        prime_dots = VGroup()
        
        for p in primes:
            if p <= numbers_to_show:
                pos = number_line.number_to_point(p)
                dot = Dot(point=pos, radius=0.15, color=BLUE)
                prime_dots.add(dot)
        
        prime_label = Text("Prime Numbers", font_size=24, color=BLUE)
        prime_label.to_edge(LEFT).shift(UP * 2)
        
        self.play(
            FadeIn(prime_label),
            LaggedStartMap(FadeIn, prime_dots, lag_ratio=0.1)
        )
        
        self.wait(1)
        
        # Highlight perfect squares
        squares = [1, 4, 9, 16, 25]
        square_dots = VGroup()
        
        for s in squares:
            if s <= numbers_to_show:
                pos = number_line.number_to_point(s)
                dot = Dot(point=pos, radius=0.15, color=GREEN)
                square_dots.add(dot)
        
        square_label = Text("Perfect Squares", font_size=24, color=GREEN)
        square_label.next_to(prime_label, DOWN)
        
        self.play(
            FadeIn(square_label),
            LaggedStartMap(FadeIn, square_dots, lag_ratio=0.1)
        )
        
        self.wait(1)
        
        # Highlight Fibonacci
        fib = [1, 1, 2, 3, 5, 8, 13, 21]
        fib_dots = VGroup()
        
        for f in fib:
            if f <= numbers_to_show and f > 0:
                pos = number_line.number_to_point(f)
                dot = Dot(point=pos, radius=0.15, color=YELLOW)
                fib_dots.add(dot)
        
        fib_label = Text("Fibonacci", font_size=24, color=YELLOW)
        fib_label.next_to(square_label, DOWN)
        
        self.play(
            FadeIn(fib_label),
            LaggedStartMap(FadeIn, fib_dots, lag_ratio=0.1)
        )
        
        self.wait(2)
        
        # Final observation
        obs = Text(
            "Some numbers belong to multiple special categories!",
            font_size=28,
            color=PURPLE
        )
        obs.to_edge(DOWN)
        self.play(Write(obs))
        
        self.wait(3)


if __name__ == "__main__":
    # Run individual animations:
    # python -m manim -pql numerology_v2.py FibonacciSpiralBuild
    # python -m manim -pql numerology_v2.py PrimeSpiralAnimated
    # python -m manim -pql numerology_v2.py GoldenRatioVisualization
    # python -m manim -pql numerology_v2.py NumberLineAnimation
    pass