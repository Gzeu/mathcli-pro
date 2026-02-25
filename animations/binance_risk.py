from manim import *
import json

class LeverageSpiral(Scene):
    def construct(self):
        # Load data
        with open('binance-status.json', 'r') as f:
            data = json.load(f)

        # Create spiral
        spiral = ParametricFunction(
            lambda t: np.array([
                t * np.cos(t),
                t * np.sin(t),
                0.1 * t
            ]),
            t_range=np.array([0, 8 * PI, 0.01]),
            color=BLUE
        )

        # Add positions as dots
        for pos in data['positions']:
            leverage = pos['leverage']
            liquidation_price = pos['liquidation_price']
            current_price = pos['current_price']
            risk = (current_price - liquidation_price) / liquidation_price

            # Color based on risk
            color = interpolate_color(RED, GREEN, risk)
            dot = Dot3D(point=spiral.point_from_proportion(risk), color=color, radius=0.1)
            self.add(dot)

        # Add labels
        title = Text("Binance Leverage Risk", font_size=24)
        title.to_edge(UP)
        self.add(title)

        self.play(Create(spiral), run_time=3)
        self.wait(2)