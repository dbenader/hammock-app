import { View } from "react-native";
import Avatar from "./Avatar";

type Props = {
    names: string[],
    size: number
}

export default function Avatars({ names, size }: Props) {
    return (
        <View style={{ flexDirection: 'row'}}>
            {names.map((name, i) => {
                return (
                    <View key={i} style={{marginLeft: i === 0 ? undefined : -1 * (size* 0.6)}}>
                        <Avatar name={name} size={size} />
                    </View>
                );
            })}
        </View>
    );
}
