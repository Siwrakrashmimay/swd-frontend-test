import { Input, Row, Col, Form } from "antd";
import { useRef } from "react";

const lengths = [1, 4, 5, 2, 1];

export default function CitizenIdRow() {
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const value = e.target.value.replace(/\D/g, "");
        e.target.value = value;

        if (value.length === lengths[index]) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    return (
        <Row gutter={8} >
            {lengths.map((len, i) => (
                <Row key={i} >
                    <Col>
                        <Form.Item name={["citizenId", `p${i + 1}`]} noStyle>
                            <Input
                                ref={(el) => {
                                    inputRefs.current[i] = el as HTMLInputElement | null;
                                }}
                                maxLength={len}
                                inputMode="numeric"
                                pattern="[0-9]*"
                                style={{
                                    width: len * 30 + 16,
                                    textAlign: "center",
                                }}
                                onChange={(e) => handleChange(e, i)}
                            />
                        </Form.Item>
                    </Col>

                    {i < lengths.length - 1 && (
                        <Col style={{ margin: "0 8px", fontWeight: "bold" }}>-</Col>
                    )}
                </Row>
            ))}
        </Row>
    );
}
