"""
MathCLI Pro - Numerology Visualizations
Ulam Spiral: Prime numbers visualization
"""

from manim import *
import numpy as np

# Note: For zoom effects, we use MovingCameraScene instead of Scene

class UlamSpiral(MovingCameraScene):
    """
    Ulam Spiral - Visualizing prime number patterns
    Numbers arranged in spiral, primes highlighted
    """
    
    def construct(self):
        # Title
        title = Text("Ulam Spiral", font_size=48)
        title.to_edge(UP)
        self.play(Write(title))
        
        # Generate Ulam spiral
        n_points = 500
        dots = VGroup()
        
        for i in range(1, n_points + 1):
            x, y = self.spiral_coords(i)
            if self.is_prime(i):
                dot = Dot(
                    point=[x * 0.08, y * 0.08, 0],
                    radius=0.03,
                    color=BLUE
                )
                dots.add(dot)
        
        # Center the spiral
        dots.move_to(ORIGIN)
        
        # Animate with lag
        self.play(
            LaggedStartMap(
                FadeIn, 
                dots, 
                lag_ratio=0.002,
                run_time=3
            )
        )
        
        # Add subtitle
        subtitle = Text(f"Primes 1-{n_points}", font_size=24)
        subtitle.next_to(title, DOWN)
        self.play(FadeIn(subtitle))
        
        self.wait(2)
        
        # Zoom in (Mesmerizing effect)
        self.play(
            self.camera.frame.animate.scale(0.5).move_to(dots.get_center()),
            run_time=2
        )
        self.wait(1)
        
        # Zoom out
        self.play(
            self.camera.frame.animate.scale(2).move_to(ORIGIN),
            run_time=2
        )
        
        # Final message
        msg = Text("Prime patterns emerge from chaos", font_size=28)
        msg.to_edge(DOWN)
        self.play(FadeIn(msg))
        self.wait(2)
    
    def is_prime(self, n):
        """Check if number is prime"""
        if n < 2:
            return False
        if n == 2:
            return True
        if n % 2 == 0:
            return False
        for i in range(3, int(np.sqrt(n)) + 1, 2):
            if n % i == 0:
                return False
        return True
    
    def spiral_coords(self, n):
        """
        Convert index to spiral coordinates (Ulam spiral)
        Returns (x, y) position on the spiral
        """
        if n == 1:
            return (0, 0)
        
        # Find the ring number
        k = int(np.ceil((np.sqrt(n) - 1) / 2))
        
        # Find position in ring
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


class FibonacciGolden(Scene):
    """
    Fibonacci sequence and Golden Ratio visualization
    """
    
    def construct(self):
        # Title
        title = Text("Fibonacci & The Golden Ratio", font_size=40)
        title.to_edge(UP)
        self.play(Write(title))
        
        # Fibonacci sequence
        fib = [1, 1]
        for i in range(12):
            fib.append(fib[-1] + fib[-2])
        
        # Build golden spiral with squares
        squares = VGroup()
        directions = [RIGHT, UP, LEFT, DOWN]
        
        current_pos = ORIGIN
        scale = 0.4
        
        for i, f in enumerate(fib[:10]):
            sq = Square(side_length=f * scale)
            sq.set_stroke(GOLD, width=2)
            sq.set_fill(GOLD, opacity=0.1)
            
            # Position based on spiral pattern
            if i == 0:
                sq.move_to(current_pos)
                current_pos = sq.get_corner(RIGHT + UP)
            elif i == 1:
                sq.next_to(squares[-1], RIGHT, buff=0)
                current_pos = sq.get_corner(RIGHT + UP)
            elif i == 2:
                sq.next_to(squares[-1], UP, buff=0)
            elif i == 3:
                sq.next_to(squares[-1], LEFT, buff=0)
            else:
                # Continue spiral
                dir_idx = (i - 2) % 4
                sq.next_to(squares[-1], directions[dir_idx], buff=0)
            
            squares.add(sq)
        
        squares.center()
        
        # Animate squares appearing
        self.play(LaggedStartMap(
            Create, 
            squares,
            lag_ratio=0.1,
            run_time=4
        ))
        
        # Add Fibonacci numbers
        fib_texts = VGroup()
        for i, (sq, f) in enumerate(zip(squares, fib[:10])):
            txt = Text(str(f), font_size=16)
            txt.move_to(sq.get_center())
            fib_texts.add(txt)
        
        self.play(LaggedStartMap(FadeIn, fib_texts, lag_ratio=0.1))
        
        self.wait(1)
        
        # Show golden ratio
        phi = Text("φ = 1.6180339887...", font_size=36, color=GOLD)
        phi.to_edge(DOWN)
        
        ratio_text = Text(
            f"144 ÷ 89 = {fib[12]/fib[11]:.10f}",
            font_size=24
        )
        ratio_text.next_to(phi, UP)
        
        self.play(FadeIn(phi), FadeIn(ratio_text))
        
        self.wait(3)


class PrimeDistribution(Scene):
    """
    Prime number distribution visualization
    Shows density and patterns
    """
    
    def construct(self):
        # Title
        title = Text("Prime Number Distribution", font_size=40)
        title.to_edge(UP)
        self.play(Write(title))
        
        # Create number line
        number_line = NumberLine(
            x_range=[0, 100, 5],
            length=12,
            color=WHITE
        )
        number_line.center()
        
        self.play(Create(number_line))
        
        # Highlight primes
        primes = [p for p in range(2, 100) if self.is_prime(p)]
        
        prime_dots = VGroup()
        for p in primes:
            pos = number_line.number_to_point(p)
            dot = Dot(point=pos, radius=0.1, color=BLUE)
            prime_dots.add(dot)
        
        self.play(LaggedStartMap(
            FadeIn,
            prime_dots,
            lag_ratio=0.05,
            run_time=2
        ))
        
        # Add prime count
        count_text = Text(f"25 primes in first 100 numbers", font_size=24)
        count_text.to_edge(DOWN)
        self.play(FadeIn(count_text))
        
        self.wait(1)
        
        # Show density formula
        formula = MathTex(
            r"\pi(n) \approx \frac{n}{\ln(n)}",
            font_size=36
        )
        formula.next_to(count_text, UP)
        self.play(Write(formula))
        
        self.wait(3)
    
    def is_prime(self, n):
        if n < 2:
            return False
        for i in range(2, int(np.sqrt(n)) + 1):
            if n % i == 0:
                return False
        return True


if __name__ == "__main__":
    # Run: manim -pql numerology_animations.py UlamSpiral
    pass